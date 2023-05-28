import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "362271606616-96sf7fsu4gdibde5lv8rlvek114aj0k5.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
