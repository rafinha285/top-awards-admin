import type {ErrorCode, ResponseType} from "../types/ResponseTypes.ts";

export class BaseException extends Error{
    protected readonly errCode: ErrorCode;

    constructor(apiResponse: ResponseType<unknown>, options?: ErrorOptions);
    constructor(error: Error, errCode: ErrorCode);
    constructor(errCode: ErrorCode, message?: string, name?:string, options?: ErrorOptions);

    constructor(
        arg1: ResponseType<unknown> | Error | ErrorCode,
        arg2?: ErrorOptions | ErrorCode | string,
        arg3?: string | ErrorOptions,
        arg4?: ErrorOptions
    ) {
        let message: string | undefined;
        let options: ErrorOptions | undefined;
        let name: string | undefined;
        let code: ErrorCode;

        // CASO 1: É um ResponseType da API (tem a propriedade errorCode e não é um Error nativo)
        if (typeof arg1 === 'object' && !(arg1 instanceof Error) && 'errorCode' in arg1) {
            const response = arg1 as ResponseType<unknown>;

            message = response.message || "Erro desconhecido da API";
            code = response.errorCode;
            name = "ApiException"; // Ou você pode usar o próprio código: response.errorCode
            options = arg2 as ErrorOptions;
        }
        // CASO 2: É um Error nativo (ex: try/catch genérico)
        else if (arg1 instanceof Error) {
            message = arg1.message;
            name = arg1.name;
            code = arg2 as ErrorCode; // O segundo argumento é o ErrorCode
            options = arg3 as ErrorOptions; // O terceiro pode ser options
        }
        // CASO 3: Construção manual (Código, msg, nome...)
        else {
            code = arg1 as ErrorCode;
            message = arg2 as string;
            name = arg3 as string;
            options = arg4;
        }

        // Chama o construtor do Pai (Error)
        super(message, options);

        this.errCode = code;
        if (name) {
            this.name = name;
        }
    }

    public getErrCode(): ErrorCode{
        return this.errCode;
    }

    toString(){
        return `name=${this.name}
        errCode = ${this.errCode.toString()}
        message = ${this.message}`
    }
}