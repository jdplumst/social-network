import { Context } from "./context";
import { Profile, User } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "validator";
import jsonwebtoken from "jsonwebtoken";
import { serialize } from "cookie";

export const resolvers = {
  Query: {
    getUserProfile: async (parent: any, args: any, context: Context) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      return await context.prisma.profile.findUnique({
        where: { userId: context.user.id }
      });
    },

    getProfiles: async (parent: any, args: any, context: Context) => {
      // if (!context.user) {
      //   throw Error("Not authorized to make this request.");
      // }
      return await context.prisma.profile.findMany();
    }
  },
  // User: {
  //   profile: async (parent: any, args: any, context: Context) => {
  //     return await context.prisma.profile.findUnique({
  //       where: { userId: parent.id }
  //     });
  //   }
  // },
  Mutation: {
    signUp: async (parent: any, args: User, context: Context) => {
      if (!args.email || !args.password) {
        throw Error("All fields must be filled.");
      }
      if (!validator.isEmail(args.email)) {
        throw Error("Email is not valid.");
      }
      if (!validator.isStrongPassword(args.password)) {
        throw Error("Password not strong enough.");
      }
      const exists = await context.prisma.user.findFirst({
        where: { email: args.email }
      });
      if (exists) throw Error("Email already in use");

      // Create a hash for password with salt
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(args.password, salt);

      try {
        const user = await context.prisma.user.create({
          data: { email: args.email, password: hash }
        });
        const token = jsonwebtoken.sign(
          { id: user.id },
          process.env.TOKEN_SECRET as string,
          { expiresIn: 60 * 60 } // expires in 1 hour
        );
        context.res.setHeader("set-cookie", [
          serialize("sn_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/"
          })
        ]);
        return { email: user.email, id: user.id };
      } catch (error) {
        throw Error("Something went wrong.");
      }
    },

    login: async (parent: any, args: User, context: Context) => {
      if (!args.email || !args.password) {
        throw Error("All fields must be filled");
      }
      const user = await context.prisma.user.findUnique({
        where: { email: args.email }
      });
      if (!user) {
        throw Error("Incorrect email");
      }
      const match = await bcrypt.compare(args.password, user.password);
      if (!match) {
        throw Error("Incorrect password");
      }
      const token = jsonwebtoken.sign(
        { id: user.id },
        process.env.TOKEN_SECRET as string,
        { expiresIn: 60 * 60 } // expires in 1 hour
      );
      context.res.setHeader("set-cookie", [
        serialize("sn_session", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60,
          path: "/"
        })
      ]);
      return { email: user.email, id: user.id };
    },

    createProfile: async (parent: any, args: Profile, context: Context) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      if (
        !args.firstName ||
        !args.lastName ||
        !args.location ||
        !args.occupation ||
        !args.gender ||
        !args.birthday
      ) {
        throw Error("All fields must be filled.");
      }
      const exists = await context.prisma.profile.findFirst({
        where: { userId: context.user.id }
      });
      if (exists) throw Error("Profile already exists.");
      const profile = await context.prisma.profile.create({
        data: {
          userId: context.user.id,
          firstName: args.firstName,
          lastName: args.lastName,
          location: args.location,
          occupation: args.occupation,
          gender: args.gender,
          birthday: args.birthday,
          profilePicture: "",
          profileCompleted: false
        }
      });
      return profile;
    },

    completeProfile: async (parent: any, args: Profile, context: Context) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      if (!args.profilePicture) {
        throw Error("Must select a profile picture.");
      }
      const exists = await context.prisma.profile.findFirst({
        where: { userId: context.user.id }
      });
      if (!exists) throw Error("Profile does not exist.");
      const profile = await context.prisma.profile.update({
        where: { userId: context.user.id },
        data: { profilePicture: args.profilePicture, profileCompleted: true }
      });
      return profile;
    },

    updateProfile: async (_parent: any, args: Profile, context: Context) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      if (
        !args.firstName ||
        !args.lastName ||
        !args.location ||
        !args.occupation ||
        !args.gender ||
        !args.birthday ||
        !args.profilePicture
      ) {
        throw Error("All fields must be filled.");
      }
      const profile = await context.prisma.profile.update({
        where: { userId: context.user.id },
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          location: args.location,
          occupation: args.occupation,
          gender: args.gender,
          birthday: args.birthday,
          profilePicture: args.profilePicture,
          profileCompleted: true
        }
      });
      return profile;
    }
  }
};
