declare module "bcryptjs" {
  const bcrypt: {
    hashSync: (s: string, salt?: number) => string;
    hash: (s: string, salt: number) => Promise<string>;
    compareSync: (s: string, hash: string) => boolean;
    compare: (s: string, hash: string) => Promise<boolean>;
    genSaltSync: (rounds?: number) => string;
    genSalt: (rounds?: number) => Promise<string>;
  };
  export = bcrypt;
}
