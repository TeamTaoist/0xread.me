interface IError {
  code: number;
  message: string;
}

interface IResponse<T extends {}> {
  code: number;
  message: string;
  data: T;
}

export const generateSuccessResponse = <T extends {}>(
  data: T
): IResponse<T> => {
  return {
    code: 0,
    message: "success",
    data,
  };
};

export const generateErrorResponse = (err: IError): IResponse<{}> => {
  return {
    code: err.code,
    message: err.message,
    data: {},
  };
};

export class Error {
  code: number;
  message: string;
  get value() {
    return {
      code: this.code,
      message: this.message,
    };
  }
  constructor(error: IError) {
    this.code = error.code;
    this.message = error.message;
  }
}
