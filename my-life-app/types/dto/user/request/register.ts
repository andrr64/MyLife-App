// types.dto.user.requetst.register.ts
export type RegisterRequest = {
  email: string;      // harus email valid
  password: string;   // min 8 chars
  fullName: string;   // max 128 chars
};
