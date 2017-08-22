
export interface ServerInterface {
  port: number;
  storage: string;
  session: {
    secret: string,
    name: string,
    resave: boolean,
    saveUninitialized: boolean,
    proxy: boolean,
  };
}
