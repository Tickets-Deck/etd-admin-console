export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse =
  | {
      message: string;
      error?: string; // Only used for error messages
      statusCode?: number; // Only used for error messages
    }
  | {
      userId: string;
      token: string;
    };
