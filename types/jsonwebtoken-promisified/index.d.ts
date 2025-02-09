// Type definitions for jsonwebtoken-promisified 1.0
// Project: https://github.com/joepie91/node-jsonwebtoken-promisified
// Definitions by: Maxime LUCE <https://github.com/SomaticIT>,
//                 Daniel Heim <https://github.com/danielheim>,
//                 Brice BERNARD <https://github.com/brikou>
//                 Aneil Mallavarapu <https://github.com/aneilbaboo>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

/// <reference types="node" />

export class JsonWebTokenError extends Error {
    inner: Error;

    constructor(message: string, error?: Error);
}

export class TokenExpiredError extends JsonWebTokenError {
    expiredAt: number;

    constructor(message: string, expiredAt: number);
}

export class NotBeforeError extends JsonWebTokenError {
    date: Date;

    constructor(message: string, date: Date);
}

export interface SignOptions {
    /**
     * Signature algorithm. Could be one of these values :
     * - HS256:    HMAC using SHA-256 hash algorithm (default)
     * - HS384:    HMAC using SHA-384 hash algorithm
     * - HS512:    HMAC using SHA-512 hash algorithm
     * - RS256:    RSASSA using SHA-256 hash algorithm
     * - RS384:    RSASSA using SHA-384 hash algorithm
     * - RS512:    RSASSA using SHA-512 hash algorithm
     * - ES256:    ECDSA using P-256 curve and SHA-256 hash algorithm
     * - ES384:    ECDSA using P-384 curve and SHA-384 hash algorithm
     * - ES512:    ECDSA using P-521 curve and SHA-512 hash algorithm
     * - none:     No digital signature or MAC value included
     */
    algorithm?: string | undefined;
    keyid?: string | undefined;
    /** {string} - expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
    expiresIn?: string | number | undefined;
    /** {string} - expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
    notBefore?: string | number | undefined;
    audience?: string | string[] | undefined;
    subject?: string | undefined;
    issuer?: string | undefined;
    jwtid?: string | undefined;
    noTimestamp?: boolean | undefined;
    header?: object | undefined;
    encoding?: string | undefined;
}

export interface VerifyOptions {
    algorithms?: string[] | undefined;
    audience?: string | string[] | undefined;
    clockTimestamp?: number | undefined;
    clockTolerance?: number | undefined;
    issuer?: string | string[] | undefined;
    ignoreExpiration?: boolean | undefined;
    ignoreNotBefore?: boolean | undefined;
    jwtid?: string | undefined;
    subject?: string | undefined;
    /**
     * @deprecated
     * {string} - Max age of token
     */
    maxAge?: string | undefined;
}

export interface DecodeOptions {
    complete?: boolean | undefined;
    json?: boolean | undefined;
}

export type VerifyCallback = (
    err: JsonWebTokenError | NotBeforeError | TokenExpiredError,
    decoded: object | string,
) => void;

export type SignCallback = (err: Error, encoded: string) => void;

export type Secret = string | Buffer | { key: string; passphrase: string };

/**
 * Synchronously sign the given payload into a JSON Web Token string
 * @param payload - Payload to sign, could be an literal, buffer or string
 * @param secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.
 * @param [options] - Options for the signature
 * @returns The JSON Web Token string
 */
export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options?: SignOptions,
): string;

/**
 * Sign the given payload into a JSON Web Token string
 * @param payload - Payload to sign, could be an literal, buffer or string
 * @param secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.
 * @param options - Options for the signature
 * @param callback - Callback to get the encoded token on
 */
export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    callback: SignCallback,
): void;
export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options: SignOptions,
    callback: SignCallback,
): void;

/**
 * Sign the given payload asynchronously into a JSON Web Token String
 * @param payload - Payload to sign, could be an literal, buffer or string
 * @param secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.
 * @param [options] - Options for the signature
 * @returns A promise providing JSON Web Token string
 */
export function signAsync(
    payload: string | Buffer | object,
    secretOrPrivateKey: Secret,
    options?: SignOptions,
): Promise<string>;

/**
 * Synchronously verify given token using a secret or a public key to get a decoded token
 * @param token - JWT string to verify
 * @param secretOrPublicKey - Either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA.
 * @param [options] - Options for the verification
 * @returns The decoded token.
 */
export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions,
): object | string;

/**
 * Asynchronously verify given token using a secret or a public key to get a decoded token
 * @param token - JWT string to verify
 * @param secretOrPublicKey - Either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA.
 * @param options - Options for the verification
 * @param callback - Callback to get the decoded token on
 */
export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    callback?: VerifyCallback,
): void;
export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options: VerifyOptions,
    callback?: VerifyCallback,
): void;

/**
 * Asynchronously verify given token using a secret or a public key to get a decoded token
 * @param token - the JWT string to verify
 * @param secretOrPublicKey - Either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA.
 * @returns - Promise returning the decoded token
 */
export function verifyAsync(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions,
): Promise<object | string>;

/**
 * Returns the decoded payload without verifying if the signature is valid.
 * @param token - JWT string to decode
 * @param [options] - Options for decoding
 * @returns The decoded Token
 */
export function decode(
    token: string,
    options?: DecodeOptions,
): null | { [key: string]: any } | string;
