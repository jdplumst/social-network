import {
  MutationCompleteProfileArgs,
  MutationCreateProfileArgs,
  MutationUpdateProfileArgs,
  QueryGetProfileArgs
} from "../server-gen/graphql";
import { Context } from "@apollo/client";

export const profileResolvers = {
  Query: {
    userProfile: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      return await context.prisma.profile.findUnique({
        where: { userId: context.user.id }
      });
    },

    getProfile: async (
      _parent: any,
      args: QueryGetProfileArgs,
      context: Context
    ) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      const profile = await context.prisma.profile.findUnique({
        where: { id: args.profileId }
      });
      return profile;
    },

    profiles: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      return await context.prisma.profile.findMany();
    }
  },
  Mutation: {
    createProfile: async (
      _parent: any,
      args: MutationCreateProfileArgs,
      context: Context
    ) => {
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

    completeProfile: async (
      _parent: any,
      args: MutationCompleteProfileArgs,
      context: Context
    ) => {
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

    updateProfile: async (
      _parent: any,
      args: MutationUpdateProfileArgs,
      context: Context
    ) => {
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
