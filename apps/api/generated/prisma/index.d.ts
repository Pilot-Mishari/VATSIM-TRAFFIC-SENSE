
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Airport
 * 
 */
export type Airport = $Result.DefaultSelection<Prisma.$AirportPayload>
/**
 * Model ControllerSession
 * 
 */
export type ControllerSession = $Result.DefaultSelection<Prisma.$ControllerSessionPayload>
/**
 * Model TrafficSnapshot
 * 
 */
export type TrafficSnapshot = $Result.DefaultSelection<Prisma.$TrafficSnapshotPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Airports
 * const airports = await prisma.airport.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Airports
   * const airports = await prisma.airport.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.airport`: Exposes CRUD operations for the **Airport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Airports
    * const airports = await prisma.airport.findMany()
    * ```
    */
  get airport(): Prisma.AirportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.controllerSession`: Exposes CRUD operations for the **ControllerSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ControllerSessions
    * const controllerSessions = await prisma.controllerSession.findMany()
    * ```
    */
  get controllerSession(): Prisma.ControllerSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trafficSnapshot`: Exposes CRUD operations for the **TrafficSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrafficSnapshots
    * const trafficSnapshots = await prisma.trafficSnapshot.findMany()
    * ```
    */
  get trafficSnapshot(): Prisma.TrafficSnapshotDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Airport: 'Airport',
    ControllerSession: 'ControllerSession',
    TrafficSnapshot: 'TrafficSnapshot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "airport" | "controllerSession" | "trafficSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Airport: {
        payload: Prisma.$AirportPayload<ExtArgs>
        fields: Prisma.AirportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AirportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AirportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          findFirst: {
            args: Prisma.AirportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AirportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          findMany: {
            args: Prisma.AirportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>[]
          }
          create: {
            args: Prisma.AirportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          createMany: {
            args: Prisma.AirportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AirportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>[]
          }
          delete: {
            args: Prisma.AirportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          update: {
            args: Prisma.AirportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          deleteMany: {
            args: Prisma.AirportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AirportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AirportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>[]
          }
          upsert: {
            args: Prisma.AirportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirportPayload>
          }
          aggregate: {
            args: Prisma.AirportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAirport>
          }
          groupBy: {
            args: Prisma.AirportGroupByArgs<ExtArgs>
            result: $Utils.Optional<AirportGroupByOutputType>[]
          }
          count: {
            args: Prisma.AirportCountArgs<ExtArgs>
            result: $Utils.Optional<AirportCountAggregateOutputType> | number
          }
        }
      }
      ControllerSession: {
        payload: Prisma.$ControllerSessionPayload<ExtArgs>
        fields: Prisma.ControllerSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ControllerSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ControllerSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>
          }
          findFirst: {
            args: Prisma.ControllerSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ControllerSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>
          }
          findMany: {
            args: Prisma.ControllerSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>[]
          }
          create: {
            args: Prisma.ControllerSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>
          }
          createMany: {
            args: Prisma.ControllerSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ControllerSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>[]
          }
          delete: {
            args: Prisma.ControllerSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>
          }
          update: {
            args: Prisma.ControllerSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>
          }
          deleteMany: {
            args: Prisma.ControllerSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ControllerSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ControllerSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>[]
          }
          upsert: {
            args: Prisma.ControllerSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ControllerSessionPayload>
          }
          aggregate: {
            args: Prisma.ControllerSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateControllerSession>
          }
          groupBy: {
            args: Prisma.ControllerSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ControllerSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ControllerSessionCountArgs<ExtArgs>
            result: $Utils.Optional<ControllerSessionCountAggregateOutputType> | number
          }
        }
      }
      TrafficSnapshot: {
        payload: Prisma.$TrafficSnapshotPayload<ExtArgs>
        fields: Prisma.TrafficSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrafficSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrafficSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>
          }
          findFirst: {
            args: Prisma.TrafficSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrafficSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>
          }
          findMany: {
            args: Prisma.TrafficSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>[]
          }
          create: {
            args: Prisma.TrafficSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>
          }
          createMany: {
            args: Prisma.TrafficSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrafficSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>[]
          }
          delete: {
            args: Prisma.TrafficSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>
          }
          update: {
            args: Prisma.TrafficSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.TrafficSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrafficSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrafficSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.TrafficSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrafficSnapshotPayload>
          }
          aggregate: {
            args: Prisma.TrafficSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrafficSnapshot>
          }
          groupBy: {
            args: Prisma.TrafficSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrafficSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrafficSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<TrafficSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    airport?: AirportOmit
    controllerSession?: ControllerSessionOmit
    trafficSnapshot?: TrafficSnapshotOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AirportCountOutputType
   */

  export type AirportCountOutputType = {
    ControllerSession: number
    TrafficSnapshot: number
  }

  export type AirportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ControllerSession?: boolean | AirportCountOutputTypeCountControllerSessionArgs
    TrafficSnapshot?: boolean | AirportCountOutputTypeCountTrafficSnapshotArgs
  }

  // Custom InputTypes
  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirportCountOutputType
     */
    select?: AirportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeCountControllerSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ControllerSessionWhereInput
  }

  /**
   * AirportCountOutputType without action
   */
  export type AirportCountOutputTypeCountTrafficSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrafficSnapshotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Airport
   */

  export type AggregateAirport = {
    _count: AirportCountAggregateOutputType | null
    _avg: AirportAvgAggregateOutputType | null
    _sum: AirportSumAggregateOutputType | null
    _min: AirportMinAggregateOutputType | null
    _max: AirportMaxAggregateOutputType | null
  }

  export type AirportAvgAggregateOutputType = {
    id: number | null
  }

  export type AirportSumAggregateOutputType = {
    id: number | null
  }

  export type AirportMinAggregateOutputType = {
    id: number | null
    icao: string | null
    name: string | null
    country: string | null
    fir: string | null
  }

  export type AirportMaxAggregateOutputType = {
    id: number | null
    icao: string | null
    name: string | null
    country: string | null
    fir: string | null
  }

  export type AirportCountAggregateOutputType = {
    id: number
    icao: number
    name: number
    country: number
    fir: number
    _all: number
  }


  export type AirportAvgAggregateInputType = {
    id?: true
  }

  export type AirportSumAggregateInputType = {
    id?: true
  }

  export type AirportMinAggregateInputType = {
    id?: true
    icao?: true
    name?: true
    country?: true
    fir?: true
  }

  export type AirportMaxAggregateInputType = {
    id?: true
    icao?: true
    name?: true
    country?: true
    fir?: true
  }

  export type AirportCountAggregateInputType = {
    id?: true
    icao?: true
    name?: true
    country?: true
    fir?: true
    _all?: true
  }

  export type AirportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airport to aggregate.
     */
    where?: AirportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportOrderByWithRelationInput | AirportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AirportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Airports
    **/
    _count?: true | AirportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AirportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AirportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AirportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AirportMaxAggregateInputType
  }

  export type GetAirportAggregateType<T extends AirportAggregateArgs> = {
        [P in keyof T & keyof AggregateAirport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAirport[P]>
      : GetScalarType<T[P], AggregateAirport[P]>
  }




  export type AirportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirportWhereInput
    orderBy?: AirportOrderByWithAggregationInput | AirportOrderByWithAggregationInput[]
    by: AirportScalarFieldEnum[] | AirportScalarFieldEnum
    having?: AirportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AirportCountAggregateInputType | true
    _avg?: AirportAvgAggregateInputType
    _sum?: AirportSumAggregateInputType
    _min?: AirportMinAggregateInputType
    _max?: AirportMaxAggregateInputType
  }

  export type AirportGroupByOutputType = {
    id: number
    icao: string
    name: string | null
    country: string | null
    fir: string | null
    _count: AirportCountAggregateOutputType | null
    _avg: AirportAvgAggregateOutputType | null
    _sum: AirportSumAggregateOutputType | null
    _min: AirportMinAggregateOutputType | null
    _max: AirportMaxAggregateOutputType | null
  }

  type GetAirportGroupByPayload<T extends AirportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AirportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AirportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AirportGroupByOutputType[P]>
            : GetScalarType<T[P], AirportGroupByOutputType[P]>
        }
      >
    >


  export type AirportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    icao?: boolean
    name?: boolean
    country?: boolean
    fir?: boolean
    ControllerSession?: boolean | Airport$ControllerSessionArgs<ExtArgs>
    TrafficSnapshot?: boolean | Airport$TrafficSnapshotArgs<ExtArgs>
    _count?: boolean | AirportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["airport"]>

  export type AirportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    icao?: boolean
    name?: boolean
    country?: boolean
    fir?: boolean
  }, ExtArgs["result"]["airport"]>

  export type AirportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    icao?: boolean
    name?: boolean
    country?: boolean
    fir?: boolean
  }, ExtArgs["result"]["airport"]>

  export type AirportSelectScalar = {
    id?: boolean
    icao?: boolean
    name?: boolean
    country?: boolean
    fir?: boolean
  }

  export type AirportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "icao" | "name" | "country" | "fir", ExtArgs["result"]["airport"]>
  export type AirportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ControllerSession?: boolean | Airport$ControllerSessionArgs<ExtArgs>
    TrafficSnapshot?: boolean | Airport$TrafficSnapshotArgs<ExtArgs>
    _count?: boolean | AirportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AirportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AirportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AirportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Airport"
    objects: {
      ControllerSession: Prisma.$ControllerSessionPayload<ExtArgs>[]
      TrafficSnapshot: Prisma.$TrafficSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      icao: string
      name: string | null
      country: string | null
      fir: string | null
    }, ExtArgs["result"]["airport"]>
    composites: {}
  }

  type AirportGetPayload<S extends boolean | null | undefined | AirportDefaultArgs> = $Result.GetResult<Prisma.$AirportPayload, S>

  type AirportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AirportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AirportCountAggregateInputType | true
    }

  export interface AirportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Airport'], meta: { name: 'Airport' } }
    /**
     * Find zero or one Airport that matches the filter.
     * @param {AirportFindUniqueArgs} args - Arguments to find a Airport
     * @example
     * // Get one Airport
     * const airport = await prisma.airport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AirportFindUniqueArgs>(args: SelectSubset<T, AirportFindUniqueArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Airport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AirportFindUniqueOrThrowArgs} args - Arguments to find a Airport
     * @example
     * // Get one Airport
     * const airport = await prisma.airport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AirportFindUniqueOrThrowArgs>(args: SelectSubset<T, AirportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportFindFirstArgs} args - Arguments to find a Airport
     * @example
     * // Get one Airport
     * const airport = await prisma.airport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AirportFindFirstArgs>(args?: SelectSubset<T, AirportFindFirstArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Airport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportFindFirstOrThrowArgs} args - Arguments to find a Airport
     * @example
     * // Get one Airport
     * const airport = await prisma.airport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AirportFindFirstOrThrowArgs>(args?: SelectSubset<T, AirportFindFirstOrThrowArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Airports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Airports
     * const airports = await prisma.airport.findMany()
     * 
     * // Get first 10 Airports
     * const airports = await prisma.airport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const airportWithIdOnly = await prisma.airport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AirportFindManyArgs>(args?: SelectSubset<T, AirportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Airport.
     * @param {AirportCreateArgs} args - Arguments to create a Airport.
     * @example
     * // Create one Airport
     * const Airport = await prisma.airport.create({
     *   data: {
     *     // ... data to create a Airport
     *   }
     * })
     * 
     */
    create<T extends AirportCreateArgs>(args: SelectSubset<T, AirportCreateArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Airports.
     * @param {AirportCreateManyArgs} args - Arguments to create many Airports.
     * @example
     * // Create many Airports
     * const airport = await prisma.airport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AirportCreateManyArgs>(args?: SelectSubset<T, AirportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Airports and returns the data saved in the database.
     * @param {AirportCreateManyAndReturnArgs} args - Arguments to create many Airports.
     * @example
     * // Create many Airports
     * const airport = await prisma.airport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Airports and only return the `id`
     * const airportWithIdOnly = await prisma.airport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AirportCreateManyAndReturnArgs>(args?: SelectSubset<T, AirportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Airport.
     * @param {AirportDeleteArgs} args - Arguments to delete one Airport.
     * @example
     * // Delete one Airport
     * const Airport = await prisma.airport.delete({
     *   where: {
     *     // ... filter to delete one Airport
     *   }
     * })
     * 
     */
    delete<T extends AirportDeleteArgs>(args: SelectSubset<T, AirportDeleteArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Airport.
     * @param {AirportUpdateArgs} args - Arguments to update one Airport.
     * @example
     * // Update one Airport
     * const airport = await prisma.airport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AirportUpdateArgs>(args: SelectSubset<T, AirportUpdateArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Airports.
     * @param {AirportDeleteManyArgs} args - Arguments to filter Airports to delete.
     * @example
     * // Delete a few Airports
     * const { count } = await prisma.airport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AirportDeleteManyArgs>(args?: SelectSubset<T, AirportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Airports
     * const airport = await prisma.airport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AirportUpdateManyArgs>(args: SelectSubset<T, AirportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Airports and returns the data updated in the database.
     * @param {AirportUpdateManyAndReturnArgs} args - Arguments to update many Airports.
     * @example
     * // Update many Airports
     * const airport = await prisma.airport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Airports and only return the `id`
     * const airportWithIdOnly = await prisma.airport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AirportUpdateManyAndReturnArgs>(args: SelectSubset<T, AirportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Airport.
     * @param {AirportUpsertArgs} args - Arguments to update or create a Airport.
     * @example
     * // Update or create a Airport
     * const airport = await prisma.airport.upsert({
     *   create: {
     *     // ... data to create a Airport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Airport we want to update
     *   }
     * })
     */
    upsert<T extends AirportUpsertArgs>(args: SelectSubset<T, AirportUpsertArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Airports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportCountArgs} args - Arguments to filter Airports to count.
     * @example
     * // Count the number of Airports
     * const count = await prisma.airport.count({
     *   where: {
     *     // ... the filter for the Airports we want to count
     *   }
     * })
    **/
    count<T extends AirportCountArgs>(
      args?: Subset<T, AirportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AirportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Airport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AirportAggregateArgs>(args: Subset<T, AirportAggregateArgs>): Prisma.PrismaPromise<GetAirportAggregateType<T>>

    /**
     * Group by Airport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AirportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AirportGroupByArgs['orderBy'] }
        : { orderBy?: AirportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AirportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAirportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Airport model
   */
  readonly fields: AirportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Airport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AirportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ControllerSession<T extends Airport$ControllerSessionArgs<ExtArgs> = {}>(args?: Subset<T, Airport$ControllerSessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    TrafficSnapshot<T extends Airport$TrafficSnapshotArgs<ExtArgs> = {}>(args?: Subset<T, Airport$TrafficSnapshotArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Airport model
   */
  interface AirportFieldRefs {
    readonly id: FieldRef<"Airport", 'Int'>
    readonly icao: FieldRef<"Airport", 'String'>
    readonly name: FieldRef<"Airport", 'String'>
    readonly country: FieldRef<"Airport", 'String'>
    readonly fir: FieldRef<"Airport", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Airport findUnique
   */
  export type AirportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airport to fetch.
     */
    where: AirportWhereUniqueInput
  }

  /**
   * Airport findUniqueOrThrow
   */
  export type AirportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airport to fetch.
     */
    where: AirportWhereUniqueInput
  }

  /**
   * Airport findFirst
   */
  export type AirportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airport to fetch.
     */
    where?: AirportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportOrderByWithRelationInput | AirportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airports.
     */
    cursor?: AirportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airports.
     */
    distinct?: AirportScalarFieldEnum | AirportScalarFieldEnum[]
  }

  /**
   * Airport findFirstOrThrow
   */
  export type AirportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airport to fetch.
     */
    where?: AirportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportOrderByWithRelationInput | AirportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Airports.
     */
    cursor?: AirportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airports.
     */
    distinct?: AirportScalarFieldEnum | AirportScalarFieldEnum[]
  }

  /**
   * Airport findMany
   */
  export type AirportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter, which Airports to fetch.
     */
    where?: AirportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Airports to fetch.
     */
    orderBy?: AirportOrderByWithRelationInput | AirportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Airports.
     */
    cursor?: AirportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Airports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Airports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Airports.
     */
    distinct?: AirportScalarFieldEnum | AirportScalarFieldEnum[]
  }

  /**
   * Airport create
   */
  export type AirportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * The data needed to create a Airport.
     */
    data: XOR<AirportCreateInput, AirportUncheckedCreateInput>
  }

  /**
   * Airport createMany
   */
  export type AirportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Airports.
     */
    data: AirportCreateManyInput | AirportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Airport createManyAndReturn
   */
  export type AirportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * The data used to create many Airports.
     */
    data: AirportCreateManyInput | AirportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Airport update
   */
  export type AirportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * The data needed to update a Airport.
     */
    data: XOR<AirportUpdateInput, AirportUncheckedUpdateInput>
    /**
     * Choose, which Airport to update.
     */
    where: AirportWhereUniqueInput
  }

  /**
   * Airport updateMany
   */
  export type AirportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Airports.
     */
    data: XOR<AirportUpdateManyMutationInput, AirportUncheckedUpdateManyInput>
    /**
     * Filter which Airports to update
     */
    where?: AirportWhereInput
    /**
     * Limit how many Airports to update.
     */
    limit?: number
  }

  /**
   * Airport updateManyAndReturn
   */
  export type AirportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * The data used to update Airports.
     */
    data: XOR<AirportUpdateManyMutationInput, AirportUncheckedUpdateManyInput>
    /**
     * Filter which Airports to update
     */
    where?: AirportWhereInput
    /**
     * Limit how many Airports to update.
     */
    limit?: number
  }

  /**
   * Airport upsert
   */
  export type AirportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * The filter to search for the Airport to update in case it exists.
     */
    where: AirportWhereUniqueInput
    /**
     * In case the Airport found by the `where` argument doesn't exist, create a new Airport with this data.
     */
    create: XOR<AirportCreateInput, AirportUncheckedCreateInput>
    /**
     * In case the Airport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AirportUpdateInput, AirportUncheckedUpdateInput>
  }

  /**
   * Airport delete
   */
  export type AirportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
    /**
     * Filter which Airport to delete.
     */
    where: AirportWhereUniqueInput
  }

  /**
   * Airport deleteMany
   */
  export type AirportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Airports to delete
     */
    where?: AirportWhereInput
    /**
     * Limit how many Airports to delete.
     */
    limit?: number
  }

  /**
   * Airport.ControllerSession
   */
  export type Airport$ControllerSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    where?: ControllerSessionWhereInput
    orderBy?: ControllerSessionOrderByWithRelationInput | ControllerSessionOrderByWithRelationInput[]
    cursor?: ControllerSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ControllerSessionScalarFieldEnum | ControllerSessionScalarFieldEnum[]
  }

  /**
   * Airport.TrafficSnapshot
   */
  export type Airport$TrafficSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    where?: TrafficSnapshotWhereInput
    orderBy?: TrafficSnapshotOrderByWithRelationInput | TrafficSnapshotOrderByWithRelationInput[]
    cursor?: TrafficSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrafficSnapshotScalarFieldEnum | TrafficSnapshotScalarFieldEnum[]
  }

  /**
   * Airport without action
   */
  export type AirportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Airport
     */
    select?: AirportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Airport
     */
    omit?: AirportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AirportInclude<ExtArgs> | null
  }


  /**
   * Model ControllerSession
   */

  export type AggregateControllerSession = {
    _count: ControllerSessionCountAggregateOutputType | null
    _avg: ControllerSessionAvgAggregateOutputType | null
    _sum: ControllerSessionSumAggregateOutputType | null
    _min: ControllerSessionMinAggregateOutputType | null
    _max: ControllerSessionMaxAggregateOutputType | null
  }

  export type ControllerSessionAvgAggregateOutputType = {
    id: number | null
    airportId: number | null
  }

  export type ControllerSessionSumAggregateOutputType = {
    id: number | null
    airportId: number | null
  }

  export type ControllerSessionMinAggregateOutputType = {
    id: number | null
    callsign: string | null
    positionType: string | null
    airportId: number | null
    startTime: Date | null
    endTime: Date | null
  }

  export type ControllerSessionMaxAggregateOutputType = {
    id: number | null
    callsign: string | null
    positionType: string | null
    airportId: number | null
    startTime: Date | null
    endTime: Date | null
  }

  export type ControllerSessionCountAggregateOutputType = {
    id: number
    callsign: number
    positionType: number
    airportId: number
    startTime: number
    endTime: number
    _all: number
  }


  export type ControllerSessionAvgAggregateInputType = {
    id?: true
    airportId?: true
  }

  export type ControllerSessionSumAggregateInputType = {
    id?: true
    airportId?: true
  }

  export type ControllerSessionMinAggregateInputType = {
    id?: true
    callsign?: true
    positionType?: true
    airportId?: true
    startTime?: true
    endTime?: true
  }

  export type ControllerSessionMaxAggregateInputType = {
    id?: true
    callsign?: true
    positionType?: true
    airportId?: true
    startTime?: true
    endTime?: true
  }

  export type ControllerSessionCountAggregateInputType = {
    id?: true
    callsign?: true
    positionType?: true
    airportId?: true
    startTime?: true
    endTime?: true
    _all?: true
  }

  export type ControllerSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ControllerSession to aggregate.
     */
    where?: ControllerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ControllerSessions to fetch.
     */
    orderBy?: ControllerSessionOrderByWithRelationInput | ControllerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ControllerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ControllerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ControllerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ControllerSessions
    **/
    _count?: true | ControllerSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ControllerSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ControllerSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ControllerSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ControllerSessionMaxAggregateInputType
  }

  export type GetControllerSessionAggregateType<T extends ControllerSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateControllerSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateControllerSession[P]>
      : GetScalarType<T[P], AggregateControllerSession[P]>
  }




  export type ControllerSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ControllerSessionWhereInput
    orderBy?: ControllerSessionOrderByWithAggregationInput | ControllerSessionOrderByWithAggregationInput[]
    by: ControllerSessionScalarFieldEnum[] | ControllerSessionScalarFieldEnum
    having?: ControllerSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ControllerSessionCountAggregateInputType | true
    _avg?: ControllerSessionAvgAggregateInputType
    _sum?: ControllerSessionSumAggregateInputType
    _min?: ControllerSessionMinAggregateInputType
    _max?: ControllerSessionMaxAggregateInputType
  }

  export type ControllerSessionGroupByOutputType = {
    id: number
    callsign: string
    positionType: string
    airportId: number
    startTime: Date
    endTime: Date | null
    _count: ControllerSessionCountAggregateOutputType | null
    _avg: ControllerSessionAvgAggregateOutputType | null
    _sum: ControllerSessionSumAggregateOutputType | null
    _min: ControllerSessionMinAggregateOutputType | null
    _max: ControllerSessionMaxAggregateOutputType | null
  }

  type GetControllerSessionGroupByPayload<T extends ControllerSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ControllerSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ControllerSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ControllerSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ControllerSessionGroupByOutputType[P]>
        }
      >
    >


  export type ControllerSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callsign?: boolean
    positionType?: boolean
    airportId?: boolean
    startTime?: boolean
    endTime?: boolean
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["controllerSession"]>

  export type ControllerSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callsign?: boolean
    positionType?: boolean
    airportId?: boolean
    startTime?: boolean
    endTime?: boolean
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["controllerSession"]>

  export type ControllerSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    callsign?: boolean
    positionType?: boolean
    airportId?: boolean
    startTime?: boolean
    endTime?: boolean
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["controllerSession"]>

  export type ControllerSessionSelectScalar = {
    id?: boolean
    callsign?: boolean
    positionType?: boolean
    airportId?: boolean
    startTime?: boolean
    endTime?: boolean
  }

  export type ControllerSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "callsign" | "positionType" | "airportId" | "startTime" | "endTime", ExtArgs["result"]["controllerSession"]>
  export type ControllerSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }
  export type ControllerSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }
  export type ControllerSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }

  export type $ControllerSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ControllerSession"
    objects: {
      Airport: Prisma.$AirportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      callsign: string
      positionType: string
      airportId: number
      startTime: Date
      endTime: Date | null
    }, ExtArgs["result"]["controllerSession"]>
    composites: {}
  }

  type ControllerSessionGetPayload<S extends boolean | null | undefined | ControllerSessionDefaultArgs> = $Result.GetResult<Prisma.$ControllerSessionPayload, S>

  type ControllerSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ControllerSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ControllerSessionCountAggregateInputType | true
    }

  export interface ControllerSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ControllerSession'], meta: { name: 'ControllerSession' } }
    /**
     * Find zero or one ControllerSession that matches the filter.
     * @param {ControllerSessionFindUniqueArgs} args - Arguments to find a ControllerSession
     * @example
     * // Get one ControllerSession
     * const controllerSession = await prisma.controllerSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ControllerSessionFindUniqueArgs>(args: SelectSubset<T, ControllerSessionFindUniqueArgs<ExtArgs>>): Prisma__ControllerSessionClient<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ControllerSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ControllerSessionFindUniqueOrThrowArgs} args - Arguments to find a ControllerSession
     * @example
     * // Get one ControllerSession
     * const controllerSession = await prisma.controllerSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ControllerSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ControllerSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ControllerSessionClient<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ControllerSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControllerSessionFindFirstArgs} args - Arguments to find a ControllerSession
     * @example
     * // Get one ControllerSession
     * const controllerSession = await prisma.controllerSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ControllerSessionFindFirstArgs>(args?: SelectSubset<T, ControllerSessionFindFirstArgs<ExtArgs>>): Prisma__ControllerSessionClient<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ControllerSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControllerSessionFindFirstOrThrowArgs} args - Arguments to find a ControllerSession
     * @example
     * // Get one ControllerSession
     * const controllerSession = await prisma.controllerSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ControllerSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ControllerSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ControllerSessionClient<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ControllerSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControllerSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ControllerSessions
     * const controllerSessions = await prisma.controllerSession.findMany()
     * 
     * // Get first 10 ControllerSessions
     * const controllerSessions = await prisma.controllerSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const controllerSessionWithIdOnly = await prisma.controllerSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ControllerSessionFindManyArgs>(args?: SelectSubset<T, ControllerSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ControllerSession.
     * @param {ControllerSessionCreateArgs} args - Arguments to create a ControllerSession.
     * @example
     * // Create one ControllerSession
     * const ControllerSession = await prisma.controllerSession.create({
     *   data: {
     *     // ... data to create a ControllerSession
     *   }
     * })
     * 
     */
    create<T extends ControllerSessionCreateArgs>(args: SelectSubset<T, ControllerSessionCreateArgs<ExtArgs>>): Prisma__ControllerSessionClient<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ControllerSessions.
     * @param {ControllerSessionCreateManyArgs} args - Arguments to create many ControllerSessions.
     * @example
     * // Create many ControllerSessions
     * const controllerSession = await prisma.controllerSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ControllerSessionCreateManyArgs>(args?: SelectSubset<T, ControllerSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ControllerSessions and returns the data saved in the database.
     * @param {ControllerSessionCreateManyAndReturnArgs} args - Arguments to create many ControllerSessions.
     * @example
     * // Create many ControllerSessions
     * const controllerSession = await prisma.controllerSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ControllerSessions and only return the `id`
     * const controllerSessionWithIdOnly = await prisma.controllerSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ControllerSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ControllerSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ControllerSession.
     * @param {ControllerSessionDeleteArgs} args - Arguments to delete one ControllerSession.
     * @example
     * // Delete one ControllerSession
     * const ControllerSession = await prisma.controllerSession.delete({
     *   where: {
     *     // ... filter to delete one ControllerSession
     *   }
     * })
     * 
     */
    delete<T extends ControllerSessionDeleteArgs>(args: SelectSubset<T, ControllerSessionDeleteArgs<ExtArgs>>): Prisma__ControllerSessionClient<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ControllerSession.
     * @param {ControllerSessionUpdateArgs} args - Arguments to update one ControllerSession.
     * @example
     * // Update one ControllerSession
     * const controllerSession = await prisma.controllerSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ControllerSessionUpdateArgs>(args: SelectSubset<T, ControllerSessionUpdateArgs<ExtArgs>>): Prisma__ControllerSessionClient<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ControllerSessions.
     * @param {ControllerSessionDeleteManyArgs} args - Arguments to filter ControllerSessions to delete.
     * @example
     * // Delete a few ControllerSessions
     * const { count } = await prisma.controllerSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ControllerSessionDeleteManyArgs>(args?: SelectSubset<T, ControllerSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ControllerSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControllerSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ControllerSessions
     * const controllerSession = await prisma.controllerSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ControllerSessionUpdateManyArgs>(args: SelectSubset<T, ControllerSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ControllerSessions and returns the data updated in the database.
     * @param {ControllerSessionUpdateManyAndReturnArgs} args - Arguments to update many ControllerSessions.
     * @example
     * // Update many ControllerSessions
     * const controllerSession = await prisma.controllerSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ControllerSessions and only return the `id`
     * const controllerSessionWithIdOnly = await prisma.controllerSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ControllerSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ControllerSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ControllerSession.
     * @param {ControllerSessionUpsertArgs} args - Arguments to update or create a ControllerSession.
     * @example
     * // Update or create a ControllerSession
     * const controllerSession = await prisma.controllerSession.upsert({
     *   create: {
     *     // ... data to create a ControllerSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ControllerSession we want to update
     *   }
     * })
     */
    upsert<T extends ControllerSessionUpsertArgs>(args: SelectSubset<T, ControllerSessionUpsertArgs<ExtArgs>>): Prisma__ControllerSessionClient<$Result.GetResult<Prisma.$ControllerSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ControllerSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControllerSessionCountArgs} args - Arguments to filter ControllerSessions to count.
     * @example
     * // Count the number of ControllerSessions
     * const count = await prisma.controllerSession.count({
     *   where: {
     *     // ... the filter for the ControllerSessions we want to count
     *   }
     * })
    **/
    count<T extends ControllerSessionCountArgs>(
      args?: Subset<T, ControllerSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ControllerSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ControllerSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControllerSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ControllerSessionAggregateArgs>(args: Subset<T, ControllerSessionAggregateArgs>): Prisma.PrismaPromise<GetControllerSessionAggregateType<T>>

    /**
     * Group by ControllerSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ControllerSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ControllerSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ControllerSessionGroupByArgs['orderBy'] }
        : { orderBy?: ControllerSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ControllerSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetControllerSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ControllerSession model
   */
  readonly fields: ControllerSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ControllerSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ControllerSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Airport<T extends AirportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportDefaultArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ControllerSession model
   */
  interface ControllerSessionFieldRefs {
    readonly id: FieldRef<"ControllerSession", 'Int'>
    readonly callsign: FieldRef<"ControllerSession", 'String'>
    readonly positionType: FieldRef<"ControllerSession", 'String'>
    readonly airportId: FieldRef<"ControllerSession", 'Int'>
    readonly startTime: FieldRef<"ControllerSession", 'DateTime'>
    readonly endTime: FieldRef<"ControllerSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ControllerSession findUnique
   */
  export type ControllerSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * Filter, which ControllerSession to fetch.
     */
    where: ControllerSessionWhereUniqueInput
  }

  /**
   * ControllerSession findUniqueOrThrow
   */
  export type ControllerSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * Filter, which ControllerSession to fetch.
     */
    where: ControllerSessionWhereUniqueInput
  }

  /**
   * ControllerSession findFirst
   */
  export type ControllerSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * Filter, which ControllerSession to fetch.
     */
    where?: ControllerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ControllerSessions to fetch.
     */
    orderBy?: ControllerSessionOrderByWithRelationInput | ControllerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ControllerSessions.
     */
    cursor?: ControllerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ControllerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ControllerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ControllerSessions.
     */
    distinct?: ControllerSessionScalarFieldEnum | ControllerSessionScalarFieldEnum[]
  }

  /**
   * ControllerSession findFirstOrThrow
   */
  export type ControllerSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * Filter, which ControllerSession to fetch.
     */
    where?: ControllerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ControllerSessions to fetch.
     */
    orderBy?: ControllerSessionOrderByWithRelationInput | ControllerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ControllerSessions.
     */
    cursor?: ControllerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ControllerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ControllerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ControllerSessions.
     */
    distinct?: ControllerSessionScalarFieldEnum | ControllerSessionScalarFieldEnum[]
  }

  /**
   * ControllerSession findMany
   */
  export type ControllerSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * Filter, which ControllerSessions to fetch.
     */
    where?: ControllerSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ControllerSessions to fetch.
     */
    orderBy?: ControllerSessionOrderByWithRelationInput | ControllerSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ControllerSessions.
     */
    cursor?: ControllerSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ControllerSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ControllerSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ControllerSessions.
     */
    distinct?: ControllerSessionScalarFieldEnum | ControllerSessionScalarFieldEnum[]
  }

  /**
   * ControllerSession create
   */
  export type ControllerSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ControllerSession.
     */
    data: XOR<ControllerSessionCreateInput, ControllerSessionUncheckedCreateInput>
  }

  /**
   * ControllerSession createMany
   */
  export type ControllerSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ControllerSessions.
     */
    data: ControllerSessionCreateManyInput | ControllerSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ControllerSession createManyAndReturn
   */
  export type ControllerSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * The data used to create many ControllerSessions.
     */
    data: ControllerSessionCreateManyInput | ControllerSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ControllerSession update
   */
  export type ControllerSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ControllerSession.
     */
    data: XOR<ControllerSessionUpdateInput, ControllerSessionUncheckedUpdateInput>
    /**
     * Choose, which ControllerSession to update.
     */
    where: ControllerSessionWhereUniqueInput
  }

  /**
   * ControllerSession updateMany
   */
  export type ControllerSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ControllerSessions.
     */
    data: XOR<ControllerSessionUpdateManyMutationInput, ControllerSessionUncheckedUpdateManyInput>
    /**
     * Filter which ControllerSessions to update
     */
    where?: ControllerSessionWhereInput
    /**
     * Limit how many ControllerSessions to update.
     */
    limit?: number
  }

  /**
   * ControllerSession updateManyAndReturn
   */
  export type ControllerSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * The data used to update ControllerSessions.
     */
    data: XOR<ControllerSessionUpdateManyMutationInput, ControllerSessionUncheckedUpdateManyInput>
    /**
     * Filter which ControllerSessions to update
     */
    where?: ControllerSessionWhereInput
    /**
     * Limit how many ControllerSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ControllerSession upsert
   */
  export type ControllerSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ControllerSession to update in case it exists.
     */
    where: ControllerSessionWhereUniqueInput
    /**
     * In case the ControllerSession found by the `where` argument doesn't exist, create a new ControllerSession with this data.
     */
    create: XOR<ControllerSessionCreateInput, ControllerSessionUncheckedCreateInput>
    /**
     * In case the ControllerSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ControllerSessionUpdateInput, ControllerSessionUncheckedUpdateInput>
  }

  /**
   * ControllerSession delete
   */
  export type ControllerSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
    /**
     * Filter which ControllerSession to delete.
     */
    where: ControllerSessionWhereUniqueInput
  }

  /**
   * ControllerSession deleteMany
   */
  export type ControllerSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ControllerSessions to delete
     */
    where?: ControllerSessionWhereInput
    /**
     * Limit how many ControllerSessions to delete.
     */
    limit?: number
  }

  /**
   * ControllerSession without action
   */
  export type ControllerSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ControllerSession
     */
    select?: ControllerSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ControllerSession
     */
    omit?: ControllerSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ControllerSessionInclude<ExtArgs> | null
  }


  /**
   * Model TrafficSnapshot
   */

  export type AggregateTrafficSnapshot = {
    _count: TrafficSnapshotCountAggregateOutputType | null
    _avg: TrafficSnapshotAvgAggregateOutputType | null
    _sum: TrafficSnapshotSumAggregateOutputType | null
    _min: TrafficSnapshotMinAggregateOutputType | null
    _max: TrafficSnapshotMaxAggregateOutputType | null
  }

  export type TrafficSnapshotAvgAggregateOutputType = {
    id: number | null
    airportId: number | null
    arrivals: number | null
    departures: number | null
    overflights: number | null
    totalAircraft: number | null
    trafficScore: number | null
  }

  export type TrafficSnapshotSumAggregateOutputType = {
    id: number | null
    airportId: number | null
    arrivals: number | null
    departures: number | null
    overflights: number | null
    totalAircraft: number | null
    trafficScore: number | null
  }

  export type TrafficSnapshotMinAggregateOutputType = {
    id: number | null
    airportId: number | null
    timestamp: Date | null
    arrivals: number | null
    departures: number | null
    overflights: number | null
    totalAircraft: number | null
    trafficScore: number | null
  }

  export type TrafficSnapshotMaxAggregateOutputType = {
    id: number | null
    airportId: number | null
    timestamp: Date | null
    arrivals: number | null
    departures: number | null
    overflights: number | null
    totalAircraft: number | null
    trafficScore: number | null
  }

  export type TrafficSnapshotCountAggregateOutputType = {
    id: number
    airportId: number
    timestamp: number
    arrivals: number
    departures: number
    overflights: number
    totalAircraft: number
    trafficScore: number
    _all: number
  }


  export type TrafficSnapshotAvgAggregateInputType = {
    id?: true
    airportId?: true
    arrivals?: true
    departures?: true
    overflights?: true
    totalAircraft?: true
    trafficScore?: true
  }

  export type TrafficSnapshotSumAggregateInputType = {
    id?: true
    airportId?: true
    arrivals?: true
    departures?: true
    overflights?: true
    totalAircraft?: true
    trafficScore?: true
  }

  export type TrafficSnapshotMinAggregateInputType = {
    id?: true
    airportId?: true
    timestamp?: true
    arrivals?: true
    departures?: true
    overflights?: true
    totalAircraft?: true
    trafficScore?: true
  }

  export type TrafficSnapshotMaxAggregateInputType = {
    id?: true
    airportId?: true
    timestamp?: true
    arrivals?: true
    departures?: true
    overflights?: true
    totalAircraft?: true
    trafficScore?: true
  }

  export type TrafficSnapshotCountAggregateInputType = {
    id?: true
    airportId?: true
    timestamp?: true
    arrivals?: true
    departures?: true
    overflights?: true
    totalAircraft?: true
    trafficScore?: true
    _all?: true
  }

  export type TrafficSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrafficSnapshot to aggregate.
     */
    where?: TrafficSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrafficSnapshots to fetch.
     */
    orderBy?: TrafficSnapshotOrderByWithRelationInput | TrafficSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrafficSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrafficSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrafficSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrafficSnapshots
    **/
    _count?: true | TrafficSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrafficSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrafficSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrafficSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrafficSnapshotMaxAggregateInputType
  }

  export type GetTrafficSnapshotAggregateType<T extends TrafficSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateTrafficSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrafficSnapshot[P]>
      : GetScalarType<T[P], AggregateTrafficSnapshot[P]>
  }




  export type TrafficSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrafficSnapshotWhereInput
    orderBy?: TrafficSnapshotOrderByWithAggregationInput | TrafficSnapshotOrderByWithAggregationInput[]
    by: TrafficSnapshotScalarFieldEnum[] | TrafficSnapshotScalarFieldEnum
    having?: TrafficSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrafficSnapshotCountAggregateInputType | true
    _avg?: TrafficSnapshotAvgAggregateInputType
    _sum?: TrafficSnapshotSumAggregateInputType
    _min?: TrafficSnapshotMinAggregateInputType
    _max?: TrafficSnapshotMaxAggregateInputType
  }

  export type TrafficSnapshotGroupByOutputType = {
    id: number
    airportId: number
    timestamp: Date
    arrivals: number
    departures: number
    overflights: number
    totalAircraft: number
    trafficScore: number
    _count: TrafficSnapshotCountAggregateOutputType | null
    _avg: TrafficSnapshotAvgAggregateOutputType | null
    _sum: TrafficSnapshotSumAggregateOutputType | null
    _min: TrafficSnapshotMinAggregateOutputType | null
    _max: TrafficSnapshotMaxAggregateOutputType | null
  }

  type GetTrafficSnapshotGroupByPayload<T extends TrafficSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrafficSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrafficSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrafficSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], TrafficSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type TrafficSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    timestamp?: boolean
    arrivals?: boolean
    departures?: boolean
    overflights?: boolean
    totalAircraft?: boolean
    trafficScore?: boolean
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trafficSnapshot"]>

  export type TrafficSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    timestamp?: boolean
    arrivals?: boolean
    departures?: boolean
    overflights?: boolean
    totalAircraft?: boolean
    trafficScore?: boolean
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trafficSnapshot"]>

  export type TrafficSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    airportId?: boolean
    timestamp?: boolean
    arrivals?: boolean
    departures?: boolean
    overflights?: boolean
    totalAircraft?: boolean
    trafficScore?: boolean
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trafficSnapshot"]>

  export type TrafficSnapshotSelectScalar = {
    id?: boolean
    airportId?: boolean
    timestamp?: boolean
    arrivals?: boolean
    departures?: boolean
    overflights?: boolean
    totalAircraft?: boolean
    trafficScore?: boolean
  }

  export type TrafficSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "airportId" | "timestamp" | "arrivals" | "departures" | "overflights" | "totalAircraft" | "trafficScore", ExtArgs["result"]["trafficSnapshot"]>
  export type TrafficSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }
  export type TrafficSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }
  export type TrafficSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Airport?: boolean | AirportDefaultArgs<ExtArgs>
  }

  export type $TrafficSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrafficSnapshot"
    objects: {
      Airport: Prisma.$AirportPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      airportId: number
      timestamp: Date
      arrivals: number
      departures: number
      overflights: number
      totalAircraft: number
      trafficScore: number
    }, ExtArgs["result"]["trafficSnapshot"]>
    composites: {}
  }

  type TrafficSnapshotGetPayload<S extends boolean | null | undefined | TrafficSnapshotDefaultArgs> = $Result.GetResult<Prisma.$TrafficSnapshotPayload, S>

  type TrafficSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrafficSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrafficSnapshotCountAggregateInputType | true
    }

  export interface TrafficSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrafficSnapshot'], meta: { name: 'TrafficSnapshot' } }
    /**
     * Find zero or one TrafficSnapshot that matches the filter.
     * @param {TrafficSnapshotFindUniqueArgs} args - Arguments to find a TrafficSnapshot
     * @example
     * // Get one TrafficSnapshot
     * const trafficSnapshot = await prisma.trafficSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrafficSnapshotFindUniqueArgs>(args: SelectSubset<T, TrafficSnapshotFindUniqueArgs<ExtArgs>>): Prisma__TrafficSnapshotClient<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrafficSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrafficSnapshotFindUniqueOrThrowArgs} args - Arguments to find a TrafficSnapshot
     * @example
     * // Get one TrafficSnapshot
     * const trafficSnapshot = await prisma.trafficSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrafficSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, TrafficSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrafficSnapshotClient<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrafficSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrafficSnapshotFindFirstArgs} args - Arguments to find a TrafficSnapshot
     * @example
     * // Get one TrafficSnapshot
     * const trafficSnapshot = await prisma.trafficSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrafficSnapshotFindFirstArgs>(args?: SelectSubset<T, TrafficSnapshotFindFirstArgs<ExtArgs>>): Prisma__TrafficSnapshotClient<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrafficSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrafficSnapshotFindFirstOrThrowArgs} args - Arguments to find a TrafficSnapshot
     * @example
     * // Get one TrafficSnapshot
     * const trafficSnapshot = await prisma.trafficSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrafficSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, TrafficSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrafficSnapshotClient<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrafficSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrafficSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrafficSnapshots
     * const trafficSnapshots = await prisma.trafficSnapshot.findMany()
     * 
     * // Get first 10 TrafficSnapshots
     * const trafficSnapshots = await prisma.trafficSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trafficSnapshotWithIdOnly = await prisma.trafficSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrafficSnapshotFindManyArgs>(args?: SelectSubset<T, TrafficSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrafficSnapshot.
     * @param {TrafficSnapshotCreateArgs} args - Arguments to create a TrafficSnapshot.
     * @example
     * // Create one TrafficSnapshot
     * const TrafficSnapshot = await prisma.trafficSnapshot.create({
     *   data: {
     *     // ... data to create a TrafficSnapshot
     *   }
     * })
     * 
     */
    create<T extends TrafficSnapshotCreateArgs>(args: SelectSubset<T, TrafficSnapshotCreateArgs<ExtArgs>>): Prisma__TrafficSnapshotClient<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrafficSnapshots.
     * @param {TrafficSnapshotCreateManyArgs} args - Arguments to create many TrafficSnapshots.
     * @example
     * // Create many TrafficSnapshots
     * const trafficSnapshot = await prisma.trafficSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrafficSnapshotCreateManyArgs>(args?: SelectSubset<T, TrafficSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrafficSnapshots and returns the data saved in the database.
     * @param {TrafficSnapshotCreateManyAndReturnArgs} args - Arguments to create many TrafficSnapshots.
     * @example
     * // Create many TrafficSnapshots
     * const trafficSnapshot = await prisma.trafficSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrafficSnapshots and only return the `id`
     * const trafficSnapshotWithIdOnly = await prisma.trafficSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrafficSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, TrafficSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrafficSnapshot.
     * @param {TrafficSnapshotDeleteArgs} args - Arguments to delete one TrafficSnapshot.
     * @example
     * // Delete one TrafficSnapshot
     * const TrafficSnapshot = await prisma.trafficSnapshot.delete({
     *   where: {
     *     // ... filter to delete one TrafficSnapshot
     *   }
     * })
     * 
     */
    delete<T extends TrafficSnapshotDeleteArgs>(args: SelectSubset<T, TrafficSnapshotDeleteArgs<ExtArgs>>): Prisma__TrafficSnapshotClient<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrafficSnapshot.
     * @param {TrafficSnapshotUpdateArgs} args - Arguments to update one TrafficSnapshot.
     * @example
     * // Update one TrafficSnapshot
     * const trafficSnapshot = await prisma.trafficSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrafficSnapshotUpdateArgs>(args: SelectSubset<T, TrafficSnapshotUpdateArgs<ExtArgs>>): Prisma__TrafficSnapshotClient<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrafficSnapshots.
     * @param {TrafficSnapshotDeleteManyArgs} args - Arguments to filter TrafficSnapshots to delete.
     * @example
     * // Delete a few TrafficSnapshots
     * const { count } = await prisma.trafficSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrafficSnapshotDeleteManyArgs>(args?: SelectSubset<T, TrafficSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrafficSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrafficSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrafficSnapshots
     * const trafficSnapshot = await prisma.trafficSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrafficSnapshotUpdateManyArgs>(args: SelectSubset<T, TrafficSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrafficSnapshots and returns the data updated in the database.
     * @param {TrafficSnapshotUpdateManyAndReturnArgs} args - Arguments to update many TrafficSnapshots.
     * @example
     * // Update many TrafficSnapshots
     * const trafficSnapshot = await prisma.trafficSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrafficSnapshots and only return the `id`
     * const trafficSnapshotWithIdOnly = await prisma.trafficSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrafficSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, TrafficSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrafficSnapshot.
     * @param {TrafficSnapshotUpsertArgs} args - Arguments to update or create a TrafficSnapshot.
     * @example
     * // Update or create a TrafficSnapshot
     * const trafficSnapshot = await prisma.trafficSnapshot.upsert({
     *   create: {
     *     // ... data to create a TrafficSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrafficSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends TrafficSnapshotUpsertArgs>(args: SelectSubset<T, TrafficSnapshotUpsertArgs<ExtArgs>>): Prisma__TrafficSnapshotClient<$Result.GetResult<Prisma.$TrafficSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrafficSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrafficSnapshotCountArgs} args - Arguments to filter TrafficSnapshots to count.
     * @example
     * // Count the number of TrafficSnapshots
     * const count = await prisma.trafficSnapshot.count({
     *   where: {
     *     // ... the filter for the TrafficSnapshots we want to count
     *   }
     * })
    **/
    count<T extends TrafficSnapshotCountArgs>(
      args?: Subset<T, TrafficSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrafficSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrafficSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrafficSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrafficSnapshotAggregateArgs>(args: Subset<T, TrafficSnapshotAggregateArgs>): Prisma.PrismaPromise<GetTrafficSnapshotAggregateType<T>>

    /**
     * Group by TrafficSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrafficSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrafficSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrafficSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: TrafficSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrafficSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrafficSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrafficSnapshot model
   */
  readonly fields: TrafficSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrafficSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrafficSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Airport<T extends AirportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AirportDefaultArgs<ExtArgs>>): Prisma__AirportClient<$Result.GetResult<Prisma.$AirportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrafficSnapshot model
   */
  interface TrafficSnapshotFieldRefs {
    readonly id: FieldRef<"TrafficSnapshot", 'Int'>
    readonly airportId: FieldRef<"TrafficSnapshot", 'Int'>
    readonly timestamp: FieldRef<"TrafficSnapshot", 'DateTime'>
    readonly arrivals: FieldRef<"TrafficSnapshot", 'Int'>
    readonly departures: FieldRef<"TrafficSnapshot", 'Int'>
    readonly overflights: FieldRef<"TrafficSnapshot", 'Int'>
    readonly totalAircraft: FieldRef<"TrafficSnapshot", 'Int'>
    readonly trafficScore: FieldRef<"TrafficSnapshot", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TrafficSnapshot findUnique
   */
  export type TrafficSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrafficSnapshot to fetch.
     */
    where: TrafficSnapshotWhereUniqueInput
  }

  /**
   * TrafficSnapshot findUniqueOrThrow
   */
  export type TrafficSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrafficSnapshot to fetch.
     */
    where: TrafficSnapshotWhereUniqueInput
  }

  /**
   * TrafficSnapshot findFirst
   */
  export type TrafficSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrafficSnapshot to fetch.
     */
    where?: TrafficSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrafficSnapshots to fetch.
     */
    orderBy?: TrafficSnapshotOrderByWithRelationInput | TrafficSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrafficSnapshots.
     */
    cursor?: TrafficSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrafficSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrafficSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrafficSnapshots.
     */
    distinct?: TrafficSnapshotScalarFieldEnum | TrafficSnapshotScalarFieldEnum[]
  }

  /**
   * TrafficSnapshot findFirstOrThrow
   */
  export type TrafficSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrafficSnapshot to fetch.
     */
    where?: TrafficSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrafficSnapshots to fetch.
     */
    orderBy?: TrafficSnapshotOrderByWithRelationInput | TrafficSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrafficSnapshots.
     */
    cursor?: TrafficSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrafficSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrafficSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrafficSnapshots.
     */
    distinct?: TrafficSnapshotScalarFieldEnum | TrafficSnapshotScalarFieldEnum[]
  }

  /**
   * TrafficSnapshot findMany
   */
  export type TrafficSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TrafficSnapshots to fetch.
     */
    where?: TrafficSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrafficSnapshots to fetch.
     */
    orderBy?: TrafficSnapshotOrderByWithRelationInput | TrafficSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrafficSnapshots.
     */
    cursor?: TrafficSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrafficSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrafficSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrafficSnapshots.
     */
    distinct?: TrafficSnapshotScalarFieldEnum | TrafficSnapshotScalarFieldEnum[]
  }

  /**
   * TrafficSnapshot create
   */
  export type TrafficSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a TrafficSnapshot.
     */
    data: XOR<TrafficSnapshotCreateInput, TrafficSnapshotUncheckedCreateInput>
  }

  /**
   * TrafficSnapshot createMany
   */
  export type TrafficSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrafficSnapshots.
     */
    data: TrafficSnapshotCreateManyInput | TrafficSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrafficSnapshot createManyAndReturn
   */
  export type TrafficSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many TrafficSnapshots.
     */
    data: TrafficSnapshotCreateManyInput | TrafficSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrafficSnapshot update
   */
  export type TrafficSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a TrafficSnapshot.
     */
    data: XOR<TrafficSnapshotUpdateInput, TrafficSnapshotUncheckedUpdateInput>
    /**
     * Choose, which TrafficSnapshot to update.
     */
    where: TrafficSnapshotWhereUniqueInput
  }

  /**
   * TrafficSnapshot updateMany
   */
  export type TrafficSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrafficSnapshots.
     */
    data: XOR<TrafficSnapshotUpdateManyMutationInput, TrafficSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which TrafficSnapshots to update
     */
    where?: TrafficSnapshotWhereInput
    /**
     * Limit how many TrafficSnapshots to update.
     */
    limit?: number
  }

  /**
   * TrafficSnapshot updateManyAndReturn
   */
  export type TrafficSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update TrafficSnapshots.
     */
    data: XOR<TrafficSnapshotUpdateManyMutationInput, TrafficSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which TrafficSnapshots to update
     */
    where?: TrafficSnapshotWhereInput
    /**
     * Limit how many TrafficSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrafficSnapshot upsert
   */
  export type TrafficSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the TrafficSnapshot to update in case it exists.
     */
    where: TrafficSnapshotWhereUniqueInput
    /**
     * In case the TrafficSnapshot found by the `where` argument doesn't exist, create a new TrafficSnapshot with this data.
     */
    create: XOR<TrafficSnapshotCreateInput, TrafficSnapshotUncheckedCreateInput>
    /**
     * In case the TrafficSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrafficSnapshotUpdateInput, TrafficSnapshotUncheckedUpdateInput>
  }

  /**
   * TrafficSnapshot delete
   */
  export type TrafficSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
    /**
     * Filter which TrafficSnapshot to delete.
     */
    where: TrafficSnapshotWhereUniqueInput
  }

  /**
   * TrafficSnapshot deleteMany
   */
  export type TrafficSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrafficSnapshots to delete
     */
    where?: TrafficSnapshotWhereInput
    /**
     * Limit how many TrafficSnapshots to delete.
     */
    limit?: number
  }

  /**
   * TrafficSnapshot without action
   */
  export type TrafficSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrafficSnapshot
     */
    select?: TrafficSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrafficSnapshot
     */
    omit?: TrafficSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrafficSnapshotInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AirportScalarFieldEnum: {
    id: 'id',
    icao: 'icao',
    name: 'name',
    country: 'country',
    fir: 'fir'
  };

  export type AirportScalarFieldEnum = (typeof AirportScalarFieldEnum)[keyof typeof AirportScalarFieldEnum]


  export const ControllerSessionScalarFieldEnum: {
    id: 'id',
    callsign: 'callsign',
    positionType: 'positionType',
    airportId: 'airportId',
    startTime: 'startTime',
    endTime: 'endTime'
  };

  export type ControllerSessionScalarFieldEnum = (typeof ControllerSessionScalarFieldEnum)[keyof typeof ControllerSessionScalarFieldEnum]


  export const TrafficSnapshotScalarFieldEnum: {
    id: 'id',
    airportId: 'airportId',
    timestamp: 'timestamp',
    arrivals: 'arrivals',
    departures: 'departures',
    overflights: 'overflights',
    totalAircraft: 'totalAircraft',
    trafficScore: 'trafficScore'
  };

  export type TrafficSnapshotScalarFieldEnum = (typeof TrafficSnapshotScalarFieldEnum)[keyof typeof TrafficSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AirportWhereInput = {
    AND?: AirportWhereInput | AirportWhereInput[]
    OR?: AirportWhereInput[]
    NOT?: AirportWhereInput | AirportWhereInput[]
    id?: IntFilter<"Airport"> | number
    icao?: StringFilter<"Airport"> | string
    name?: StringNullableFilter<"Airport"> | string | null
    country?: StringNullableFilter<"Airport"> | string | null
    fir?: StringNullableFilter<"Airport"> | string | null
    ControllerSession?: ControllerSessionListRelationFilter
    TrafficSnapshot?: TrafficSnapshotListRelationFilter
  }

  export type AirportOrderByWithRelationInput = {
    id?: SortOrder
    icao?: SortOrder
    name?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    fir?: SortOrderInput | SortOrder
    ControllerSession?: ControllerSessionOrderByRelationAggregateInput
    TrafficSnapshot?: TrafficSnapshotOrderByRelationAggregateInput
  }

  export type AirportWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    icao?: string
    AND?: AirportWhereInput | AirportWhereInput[]
    OR?: AirportWhereInput[]
    NOT?: AirportWhereInput | AirportWhereInput[]
    name?: StringNullableFilter<"Airport"> | string | null
    country?: StringNullableFilter<"Airport"> | string | null
    fir?: StringNullableFilter<"Airport"> | string | null
    ControllerSession?: ControllerSessionListRelationFilter
    TrafficSnapshot?: TrafficSnapshotListRelationFilter
  }, "id" | "icao">

  export type AirportOrderByWithAggregationInput = {
    id?: SortOrder
    icao?: SortOrder
    name?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    fir?: SortOrderInput | SortOrder
    _count?: AirportCountOrderByAggregateInput
    _avg?: AirportAvgOrderByAggregateInput
    _max?: AirportMaxOrderByAggregateInput
    _min?: AirportMinOrderByAggregateInput
    _sum?: AirportSumOrderByAggregateInput
  }

  export type AirportScalarWhereWithAggregatesInput = {
    AND?: AirportScalarWhereWithAggregatesInput | AirportScalarWhereWithAggregatesInput[]
    OR?: AirportScalarWhereWithAggregatesInput[]
    NOT?: AirportScalarWhereWithAggregatesInput | AirportScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Airport"> | number
    icao?: StringWithAggregatesFilter<"Airport"> | string
    name?: StringNullableWithAggregatesFilter<"Airport"> | string | null
    country?: StringNullableWithAggregatesFilter<"Airport"> | string | null
    fir?: StringNullableWithAggregatesFilter<"Airport"> | string | null
  }

  export type ControllerSessionWhereInput = {
    AND?: ControllerSessionWhereInput | ControllerSessionWhereInput[]
    OR?: ControllerSessionWhereInput[]
    NOT?: ControllerSessionWhereInput | ControllerSessionWhereInput[]
    id?: IntFilter<"ControllerSession"> | number
    callsign?: StringFilter<"ControllerSession"> | string
    positionType?: StringFilter<"ControllerSession"> | string
    airportId?: IntFilter<"ControllerSession"> | number
    startTime?: DateTimeFilter<"ControllerSession"> | Date | string
    endTime?: DateTimeNullableFilter<"ControllerSession"> | Date | string | null
    Airport?: XOR<AirportScalarRelationFilter, AirportWhereInput>
  }

  export type ControllerSessionOrderByWithRelationInput = {
    id?: SortOrder
    callsign?: SortOrder
    positionType?: SortOrder
    airportId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    Airport?: AirportOrderByWithRelationInput
  }

  export type ControllerSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ControllerSessionWhereInput | ControllerSessionWhereInput[]
    OR?: ControllerSessionWhereInput[]
    NOT?: ControllerSessionWhereInput | ControllerSessionWhereInput[]
    callsign?: StringFilter<"ControllerSession"> | string
    positionType?: StringFilter<"ControllerSession"> | string
    airportId?: IntFilter<"ControllerSession"> | number
    startTime?: DateTimeFilter<"ControllerSession"> | Date | string
    endTime?: DateTimeNullableFilter<"ControllerSession"> | Date | string | null
    Airport?: XOR<AirportScalarRelationFilter, AirportWhereInput>
  }, "id">

  export type ControllerSessionOrderByWithAggregationInput = {
    id?: SortOrder
    callsign?: SortOrder
    positionType?: SortOrder
    airportId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    _count?: ControllerSessionCountOrderByAggregateInput
    _avg?: ControllerSessionAvgOrderByAggregateInput
    _max?: ControllerSessionMaxOrderByAggregateInput
    _min?: ControllerSessionMinOrderByAggregateInput
    _sum?: ControllerSessionSumOrderByAggregateInput
  }

  export type ControllerSessionScalarWhereWithAggregatesInput = {
    AND?: ControllerSessionScalarWhereWithAggregatesInput | ControllerSessionScalarWhereWithAggregatesInput[]
    OR?: ControllerSessionScalarWhereWithAggregatesInput[]
    NOT?: ControllerSessionScalarWhereWithAggregatesInput | ControllerSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ControllerSession"> | number
    callsign?: StringWithAggregatesFilter<"ControllerSession"> | string
    positionType?: StringWithAggregatesFilter<"ControllerSession"> | string
    airportId?: IntWithAggregatesFilter<"ControllerSession"> | number
    startTime?: DateTimeWithAggregatesFilter<"ControllerSession"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"ControllerSession"> | Date | string | null
  }

  export type TrafficSnapshotWhereInput = {
    AND?: TrafficSnapshotWhereInput | TrafficSnapshotWhereInput[]
    OR?: TrafficSnapshotWhereInput[]
    NOT?: TrafficSnapshotWhereInput | TrafficSnapshotWhereInput[]
    id?: IntFilter<"TrafficSnapshot"> | number
    airportId?: IntFilter<"TrafficSnapshot"> | number
    timestamp?: DateTimeFilter<"TrafficSnapshot"> | Date | string
    arrivals?: IntFilter<"TrafficSnapshot"> | number
    departures?: IntFilter<"TrafficSnapshot"> | number
    overflights?: IntFilter<"TrafficSnapshot"> | number
    totalAircraft?: IntFilter<"TrafficSnapshot"> | number
    trafficScore?: IntFilter<"TrafficSnapshot"> | number
    Airport?: XOR<AirportScalarRelationFilter, AirportWhereInput>
  }

  export type TrafficSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    airportId?: SortOrder
    timestamp?: SortOrder
    arrivals?: SortOrder
    departures?: SortOrder
    overflights?: SortOrder
    totalAircraft?: SortOrder
    trafficScore?: SortOrder
    Airport?: AirportOrderByWithRelationInput
  }

  export type TrafficSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TrafficSnapshotWhereInput | TrafficSnapshotWhereInput[]
    OR?: TrafficSnapshotWhereInput[]
    NOT?: TrafficSnapshotWhereInput | TrafficSnapshotWhereInput[]
    airportId?: IntFilter<"TrafficSnapshot"> | number
    timestamp?: DateTimeFilter<"TrafficSnapshot"> | Date | string
    arrivals?: IntFilter<"TrafficSnapshot"> | number
    departures?: IntFilter<"TrafficSnapshot"> | number
    overflights?: IntFilter<"TrafficSnapshot"> | number
    totalAircraft?: IntFilter<"TrafficSnapshot"> | number
    trafficScore?: IntFilter<"TrafficSnapshot"> | number
    Airport?: XOR<AirportScalarRelationFilter, AirportWhereInput>
  }, "id">

  export type TrafficSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    airportId?: SortOrder
    timestamp?: SortOrder
    arrivals?: SortOrder
    departures?: SortOrder
    overflights?: SortOrder
    totalAircraft?: SortOrder
    trafficScore?: SortOrder
    _count?: TrafficSnapshotCountOrderByAggregateInput
    _avg?: TrafficSnapshotAvgOrderByAggregateInput
    _max?: TrafficSnapshotMaxOrderByAggregateInput
    _min?: TrafficSnapshotMinOrderByAggregateInput
    _sum?: TrafficSnapshotSumOrderByAggregateInput
  }

  export type TrafficSnapshotScalarWhereWithAggregatesInput = {
    AND?: TrafficSnapshotScalarWhereWithAggregatesInput | TrafficSnapshotScalarWhereWithAggregatesInput[]
    OR?: TrafficSnapshotScalarWhereWithAggregatesInput[]
    NOT?: TrafficSnapshotScalarWhereWithAggregatesInput | TrafficSnapshotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TrafficSnapshot"> | number
    airportId?: IntWithAggregatesFilter<"TrafficSnapshot"> | number
    timestamp?: DateTimeWithAggregatesFilter<"TrafficSnapshot"> | Date | string
    arrivals?: IntWithAggregatesFilter<"TrafficSnapshot"> | number
    departures?: IntWithAggregatesFilter<"TrafficSnapshot"> | number
    overflights?: IntWithAggregatesFilter<"TrafficSnapshot"> | number
    totalAircraft?: IntWithAggregatesFilter<"TrafficSnapshot"> | number
    trafficScore?: IntWithAggregatesFilter<"TrafficSnapshot"> | number
  }

  export type AirportCreateInput = {
    icao: string
    name?: string | null
    country?: string | null
    fir?: string | null
    ControllerSession?: ControllerSessionCreateNestedManyWithoutAirportInput
    TrafficSnapshot?: TrafficSnapshotCreateNestedManyWithoutAirportInput
  }

  export type AirportUncheckedCreateInput = {
    id?: number
    icao: string
    name?: string | null
    country?: string | null
    fir?: string | null
    ControllerSession?: ControllerSessionUncheckedCreateNestedManyWithoutAirportInput
    TrafficSnapshot?: TrafficSnapshotUncheckedCreateNestedManyWithoutAirportInput
  }

  export type AirportUpdateInput = {
    icao?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fir?: NullableStringFieldUpdateOperationsInput | string | null
    ControllerSession?: ControllerSessionUpdateManyWithoutAirportNestedInput
    TrafficSnapshot?: TrafficSnapshotUpdateManyWithoutAirportNestedInput
  }

  export type AirportUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    icao?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fir?: NullableStringFieldUpdateOperationsInput | string | null
    ControllerSession?: ControllerSessionUncheckedUpdateManyWithoutAirportNestedInput
    TrafficSnapshot?: TrafficSnapshotUncheckedUpdateManyWithoutAirportNestedInput
  }

  export type AirportCreateManyInput = {
    id?: number
    icao: string
    name?: string | null
    country?: string | null
    fir?: string | null
  }

  export type AirportUpdateManyMutationInput = {
    icao?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fir?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AirportUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    icao?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fir?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ControllerSessionCreateInput = {
    callsign: string
    positionType: string
    startTime: Date | string
    endTime?: Date | string | null
    Airport: AirportCreateNestedOneWithoutControllerSessionInput
  }

  export type ControllerSessionUncheckedCreateInput = {
    id?: number
    callsign: string
    positionType: string
    airportId: number
    startTime: Date | string
    endTime?: Date | string | null
  }

  export type ControllerSessionUpdateInput = {
    callsign?: StringFieldUpdateOperationsInput | string
    positionType?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Airport?: AirportUpdateOneRequiredWithoutControllerSessionNestedInput
  }

  export type ControllerSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    callsign?: StringFieldUpdateOperationsInput | string
    positionType?: StringFieldUpdateOperationsInput | string
    airportId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ControllerSessionCreateManyInput = {
    id?: number
    callsign: string
    positionType: string
    airportId: number
    startTime: Date | string
    endTime?: Date | string | null
  }

  export type ControllerSessionUpdateManyMutationInput = {
    callsign?: StringFieldUpdateOperationsInput | string
    positionType?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ControllerSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    callsign?: StringFieldUpdateOperationsInput | string
    positionType?: StringFieldUpdateOperationsInput | string
    airportId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TrafficSnapshotCreateInput = {
    timestamp?: Date | string
    arrivals: number
    departures: number
    overflights: number
    totalAircraft: number
    trafficScore: number
    Airport: AirportCreateNestedOneWithoutTrafficSnapshotInput
  }

  export type TrafficSnapshotUncheckedCreateInput = {
    id?: number
    airportId: number
    timestamp?: Date | string
    arrivals: number
    departures: number
    overflights: number
    totalAircraft: number
    trafficScore: number
  }

  export type TrafficSnapshotUpdateInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivals?: IntFieldUpdateOperationsInput | number
    departures?: IntFieldUpdateOperationsInput | number
    overflights?: IntFieldUpdateOperationsInput | number
    totalAircraft?: IntFieldUpdateOperationsInput | number
    trafficScore?: IntFieldUpdateOperationsInput | number
    Airport?: AirportUpdateOneRequiredWithoutTrafficSnapshotNestedInput
  }

  export type TrafficSnapshotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    airportId?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivals?: IntFieldUpdateOperationsInput | number
    departures?: IntFieldUpdateOperationsInput | number
    overflights?: IntFieldUpdateOperationsInput | number
    totalAircraft?: IntFieldUpdateOperationsInput | number
    trafficScore?: IntFieldUpdateOperationsInput | number
  }

  export type TrafficSnapshotCreateManyInput = {
    id?: number
    airportId: number
    timestamp?: Date | string
    arrivals: number
    departures: number
    overflights: number
    totalAircraft: number
    trafficScore: number
  }

  export type TrafficSnapshotUpdateManyMutationInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivals?: IntFieldUpdateOperationsInput | number
    departures?: IntFieldUpdateOperationsInput | number
    overflights?: IntFieldUpdateOperationsInput | number
    totalAircraft?: IntFieldUpdateOperationsInput | number
    trafficScore?: IntFieldUpdateOperationsInput | number
  }

  export type TrafficSnapshotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    airportId?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivals?: IntFieldUpdateOperationsInput | number
    departures?: IntFieldUpdateOperationsInput | number
    overflights?: IntFieldUpdateOperationsInput | number
    totalAircraft?: IntFieldUpdateOperationsInput | number
    trafficScore?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ControllerSessionListRelationFilter = {
    every?: ControllerSessionWhereInput
    some?: ControllerSessionWhereInput
    none?: ControllerSessionWhereInput
  }

  export type TrafficSnapshotListRelationFilter = {
    every?: TrafficSnapshotWhereInput
    some?: TrafficSnapshotWhereInput
    none?: TrafficSnapshotWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ControllerSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrafficSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AirportCountOrderByAggregateInput = {
    id?: SortOrder
    icao?: SortOrder
    name?: SortOrder
    country?: SortOrder
    fir?: SortOrder
  }

  export type AirportAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AirportMaxOrderByAggregateInput = {
    id?: SortOrder
    icao?: SortOrder
    name?: SortOrder
    country?: SortOrder
    fir?: SortOrder
  }

  export type AirportMinOrderByAggregateInput = {
    id?: SortOrder
    icao?: SortOrder
    name?: SortOrder
    country?: SortOrder
    fir?: SortOrder
  }

  export type AirportSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AirportScalarRelationFilter = {
    is?: AirportWhereInput
    isNot?: AirportWhereInput
  }

  export type ControllerSessionCountOrderByAggregateInput = {
    id?: SortOrder
    callsign?: SortOrder
    positionType?: SortOrder
    airportId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
  }

  export type ControllerSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
  }

  export type ControllerSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    callsign?: SortOrder
    positionType?: SortOrder
    airportId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
  }

  export type ControllerSessionMinOrderByAggregateInput = {
    id?: SortOrder
    callsign?: SortOrder
    positionType?: SortOrder
    airportId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
  }

  export type ControllerSessionSumOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TrafficSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    timestamp?: SortOrder
    arrivals?: SortOrder
    departures?: SortOrder
    overflights?: SortOrder
    totalAircraft?: SortOrder
    trafficScore?: SortOrder
  }

  export type TrafficSnapshotAvgOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    arrivals?: SortOrder
    departures?: SortOrder
    overflights?: SortOrder
    totalAircraft?: SortOrder
    trafficScore?: SortOrder
  }

  export type TrafficSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    timestamp?: SortOrder
    arrivals?: SortOrder
    departures?: SortOrder
    overflights?: SortOrder
    totalAircraft?: SortOrder
    trafficScore?: SortOrder
  }

  export type TrafficSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    timestamp?: SortOrder
    arrivals?: SortOrder
    departures?: SortOrder
    overflights?: SortOrder
    totalAircraft?: SortOrder
    trafficScore?: SortOrder
  }

  export type TrafficSnapshotSumOrderByAggregateInput = {
    id?: SortOrder
    airportId?: SortOrder
    arrivals?: SortOrder
    departures?: SortOrder
    overflights?: SortOrder
    totalAircraft?: SortOrder
    trafficScore?: SortOrder
  }

  export type ControllerSessionCreateNestedManyWithoutAirportInput = {
    create?: XOR<ControllerSessionCreateWithoutAirportInput, ControllerSessionUncheckedCreateWithoutAirportInput> | ControllerSessionCreateWithoutAirportInput[] | ControllerSessionUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: ControllerSessionCreateOrConnectWithoutAirportInput | ControllerSessionCreateOrConnectWithoutAirportInput[]
    createMany?: ControllerSessionCreateManyAirportInputEnvelope
    connect?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
  }

  export type TrafficSnapshotCreateNestedManyWithoutAirportInput = {
    create?: XOR<TrafficSnapshotCreateWithoutAirportInput, TrafficSnapshotUncheckedCreateWithoutAirportInput> | TrafficSnapshotCreateWithoutAirportInput[] | TrafficSnapshotUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: TrafficSnapshotCreateOrConnectWithoutAirportInput | TrafficSnapshotCreateOrConnectWithoutAirportInput[]
    createMany?: TrafficSnapshotCreateManyAirportInputEnvelope
    connect?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
  }

  export type ControllerSessionUncheckedCreateNestedManyWithoutAirportInput = {
    create?: XOR<ControllerSessionCreateWithoutAirportInput, ControllerSessionUncheckedCreateWithoutAirportInput> | ControllerSessionCreateWithoutAirportInput[] | ControllerSessionUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: ControllerSessionCreateOrConnectWithoutAirportInput | ControllerSessionCreateOrConnectWithoutAirportInput[]
    createMany?: ControllerSessionCreateManyAirportInputEnvelope
    connect?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
  }

  export type TrafficSnapshotUncheckedCreateNestedManyWithoutAirportInput = {
    create?: XOR<TrafficSnapshotCreateWithoutAirportInput, TrafficSnapshotUncheckedCreateWithoutAirportInput> | TrafficSnapshotCreateWithoutAirportInput[] | TrafficSnapshotUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: TrafficSnapshotCreateOrConnectWithoutAirportInput | TrafficSnapshotCreateOrConnectWithoutAirportInput[]
    createMany?: TrafficSnapshotCreateManyAirportInputEnvelope
    connect?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ControllerSessionUpdateManyWithoutAirportNestedInput = {
    create?: XOR<ControllerSessionCreateWithoutAirportInput, ControllerSessionUncheckedCreateWithoutAirportInput> | ControllerSessionCreateWithoutAirportInput[] | ControllerSessionUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: ControllerSessionCreateOrConnectWithoutAirportInput | ControllerSessionCreateOrConnectWithoutAirportInput[]
    upsert?: ControllerSessionUpsertWithWhereUniqueWithoutAirportInput | ControllerSessionUpsertWithWhereUniqueWithoutAirportInput[]
    createMany?: ControllerSessionCreateManyAirportInputEnvelope
    set?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
    disconnect?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
    delete?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
    connect?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
    update?: ControllerSessionUpdateWithWhereUniqueWithoutAirportInput | ControllerSessionUpdateWithWhereUniqueWithoutAirportInput[]
    updateMany?: ControllerSessionUpdateManyWithWhereWithoutAirportInput | ControllerSessionUpdateManyWithWhereWithoutAirportInput[]
    deleteMany?: ControllerSessionScalarWhereInput | ControllerSessionScalarWhereInput[]
  }

  export type TrafficSnapshotUpdateManyWithoutAirportNestedInput = {
    create?: XOR<TrafficSnapshotCreateWithoutAirportInput, TrafficSnapshotUncheckedCreateWithoutAirportInput> | TrafficSnapshotCreateWithoutAirportInput[] | TrafficSnapshotUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: TrafficSnapshotCreateOrConnectWithoutAirportInput | TrafficSnapshotCreateOrConnectWithoutAirportInput[]
    upsert?: TrafficSnapshotUpsertWithWhereUniqueWithoutAirportInput | TrafficSnapshotUpsertWithWhereUniqueWithoutAirportInput[]
    createMany?: TrafficSnapshotCreateManyAirportInputEnvelope
    set?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
    disconnect?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
    delete?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
    connect?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
    update?: TrafficSnapshotUpdateWithWhereUniqueWithoutAirportInput | TrafficSnapshotUpdateWithWhereUniqueWithoutAirportInput[]
    updateMany?: TrafficSnapshotUpdateManyWithWhereWithoutAirportInput | TrafficSnapshotUpdateManyWithWhereWithoutAirportInput[]
    deleteMany?: TrafficSnapshotScalarWhereInput | TrafficSnapshotScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ControllerSessionUncheckedUpdateManyWithoutAirportNestedInput = {
    create?: XOR<ControllerSessionCreateWithoutAirportInput, ControllerSessionUncheckedCreateWithoutAirportInput> | ControllerSessionCreateWithoutAirportInput[] | ControllerSessionUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: ControllerSessionCreateOrConnectWithoutAirportInput | ControllerSessionCreateOrConnectWithoutAirportInput[]
    upsert?: ControllerSessionUpsertWithWhereUniqueWithoutAirportInput | ControllerSessionUpsertWithWhereUniqueWithoutAirportInput[]
    createMany?: ControllerSessionCreateManyAirportInputEnvelope
    set?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
    disconnect?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
    delete?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
    connect?: ControllerSessionWhereUniqueInput | ControllerSessionWhereUniqueInput[]
    update?: ControllerSessionUpdateWithWhereUniqueWithoutAirportInput | ControllerSessionUpdateWithWhereUniqueWithoutAirportInput[]
    updateMany?: ControllerSessionUpdateManyWithWhereWithoutAirportInput | ControllerSessionUpdateManyWithWhereWithoutAirportInput[]
    deleteMany?: ControllerSessionScalarWhereInput | ControllerSessionScalarWhereInput[]
  }

  export type TrafficSnapshotUncheckedUpdateManyWithoutAirportNestedInput = {
    create?: XOR<TrafficSnapshotCreateWithoutAirportInput, TrafficSnapshotUncheckedCreateWithoutAirportInput> | TrafficSnapshotCreateWithoutAirportInput[] | TrafficSnapshotUncheckedCreateWithoutAirportInput[]
    connectOrCreate?: TrafficSnapshotCreateOrConnectWithoutAirportInput | TrafficSnapshotCreateOrConnectWithoutAirportInput[]
    upsert?: TrafficSnapshotUpsertWithWhereUniqueWithoutAirportInput | TrafficSnapshotUpsertWithWhereUniqueWithoutAirportInput[]
    createMany?: TrafficSnapshotCreateManyAirportInputEnvelope
    set?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
    disconnect?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
    delete?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
    connect?: TrafficSnapshotWhereUniqueInput | TrafficSnapshotWhereUniqueInput[]
    update?: TrafficSnapshotUpdateWithWhereUniqueWithoutAirportInput | TrafficSnapshotUpdateWithWhereUniqueWithoutAirportInput[]
    updateMany?: TrafficSnapshotUpdateManyWithWhereWithoutAirportInput | TrafficSnapshotUpdateManyWithWhereWithoutAirportInput[]
    deleteMany?: TrafficSnapshotScalarWhereInput | TrafficSnapshotScalarWhereInput[]
  }

  export type AirportCreateNestedOneWithoutControllerSessionInput = {
    create?: XOR<AirportCreateWithoutControllerSessionInput, AirportUncheckedCreateWithoutControllerSessionInput>
    connectOrCreate?: AirportCreateOrConnectWithoutControllerSessionInput
    connect?: AirportWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AirportUpdateOneRequiredWithoutControllerSessionNestedInput = {
    create?: XOR<AirportCreateWithoutControllerSessionInput, AirportUncheckedCreateWithoutControllerSessionInput>
    connectOrCreate?: AirportCreateOrConnectWithoutControllerSessionInput
    upsert?: AirportUpsertWithoutControllerSessionInput
    connect?: AirportWhereUniqueInput
    update?: XOR<XOR<AirportUpdateToOneWithWhereWithoutControllerSessionInput, AirportUpdateWithoutControllerSessionInput>, AirportUncheckedUpdateWithoutControllerSessionInput>
  }

  export type AirportCreateNestedOneWithoutTrafficSnapshotInput = {
    create?: XOR<AirportCreateWithoutTrafficSnapshotInput, AirportUncheckedCreateWithoutTrafficSnapshotInput>
    connectOrCreate?: AirportCreateOrConnectWithoutTrafficSnapshotInput
    connect?: AirportWhereUniqueInput
  }

  export type AirportUpdateOneRequiredWithoutTrafficSnapshotNestedInput = {
    create?: XOR<AirportCreateWithoutTrafficSnapshotInput, AirportUncheckedCreateWithoutTrafficSnapshotInput>
    connectOrCreate?: AirportCreateOrConnectWithoutTrafficSnapshotInput
    upsert?: AirportUpsertWithoutTrafficSnapshotInput
    connect?: AirportWhereUniqueInput
    update?: XOR<XOR<AirportUpdateToOneWithWhereWithoutTrafficSnapshotInput, AirportUpdateWithoutTrafficSnapshotInput>, AirportUncheckedUpdateWithoutTrafficSnapshotInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ControllerSessionCreateWithoutAirportInput = {
    callsign: string
    positionType: string
    startTime: Date | string
    endTime?: Date | string | null
  }

  export type ControllerSessionUncheckedCreateWithoutAirportInput = {
    id?: number
    callsign: string
    positionType: string
    startTime: Date | string
    endTime?: Date | string | null
  }

  export type ControllerSessionCreateOrConnectWithoutAirportInput = {
    where: ControllerSessionWhereUniqueInput
    create: XOR<ControllerSessionCreateWithoutAirportInput, ControllerSessionUncheckedCreateWithoutAirportInput>
  }

  export type ControllerSessionCreateManyAirportInputEnvelope = {
    data: ControllerSessionCreateManyAirportInput | ControllerSessionCreateManyAirportInput[]
    skipDuplicates?: boolean
  }

  export type TrafficSnapshotCreateWithoutAirportInput = {
    timestamp?: Date | string
    arrivals: number
    departures: number
    overflights: number
    totalAircraft: number
    trafficScore: number
  }

  export type TrafficSnapshotUncheckedCreateWithoutAirportInput = {
    id?: number
    timestamp?: Date | string
    arrivals: number
    departures: number
    overflights: number
    totalAircraft: number
    trafficScore: number
  }

  export type TrafficSnapshotCreateOrConnectWithoutAirportInput = {
    where: TrafficSnapshotWhereUniqueInput
    create: XOR<TrafficSnapshotCreateWithoutAirportInput, TrafficSnapshotUncheckedCreateWithoutAirportInput>
  }

  export type TrafficSnapshotCreateManyAirportInputEnvelope = {
    data: TrafficSnapshotCreateManyAirportInput | TrafficSnapshotCreateManyAirportInput[]
    skipDuplicates?: boolean
  }

  export type ControllerSessionUpsertWithWhereUniqueWithoutAirportInput = {
    where: ControllerSessionWhereUniqueInput
    update: XOR<ControllerSessionUpdateWithoutAirportInput, ControllerSessionUncheckedUpdateWithoutAirportInput>
    create: XOR<ControllerSessionCreateWithoutAirportInput, ControllerSessionUncheckedCreateWithoutAirportInput>
  }

  export type ControllerSessionUpdateWithWhereUniqueWithoutAirportInput = {
    where: ControllerSessionWhereUniqueInput
    data: XOR<ControllerSessionUpdateWithoutAirportInput, ControllerSessionUncheckedUpdateWithoutAirportInput>
  }

  export type ControllerSessionUpdateManyWithWhereWithoutAirportInput = {
    where: ControllerSessionScalarWhereInput
    data: XOR<ControllerSessionUpdateManyMutationInput, ControllerSessionUncheckedUpdateManyWithoutAirportInput>
  }

  export type ControllerSessionScalarWhereInput = {
    AND?: ControllerSessionScalarWhereInput | ControllerSessionScalarWhereInput[]
    OR?: ControllerSessionScalarWhereInput[]
    NOT?: ControllerSessionScalarWhereInput | ControllerSessionScalarWhereInput[]
    id?: IntFilter<"ControllerSession"> | number
    callsign?: StringFilter<"ControllerSession"> | string
    positionType?: StringFilter<"ControllerSession"> | string
    airportId?: IntFilter<"ControllerSession"> | number
    startTime?: DateTimeFilter<"ControllerSession"> | Date | string
    endTime?: DateTimeNullableFilter<"ControllerSession"> | Date | string | null
  }

  export type TrafficSnapshotUpsertWithWhereUniqueWithoutAirportInput = {
    where: TrafficSnapshotWhereUniqueInput
    update: XOR<TrafficSnapshotUpdateWithoutAirportInput, TrafficSnapshotUncheckedUpdateWithoutAirportInput>
    create: XOR<TrafficSnapshotCreateWithoutAirportInput, TrafficSnapshotUncheckedCreateWithoutAirportInput>
  }

  export type TrafficSnapshotUpdateWithWhereUniqueWithoutAirportInput = {
    where: TrafficSnapshotWhereUniqueInput
    data: XOR<TrafficSnapshotUpdateWithoutAirportInput, TrafficSnapshotUncheckedUpdateWithoutAirportInput>
  }

  export type TrafficSnapshotUpdateManyWithWhereWithoutAirportInput = {
    where: TrafficSnapshotScalarWhereInput
    data: XOR<TrafficSnapshotUpdateManyMutationInput, TrafficSnapshotUncheckedUpdateManyWithoutAirportInput>
  }

  export type TrafficSnapshotScalarWhereInput = {
    AND?: TrafficSnapshotScalarWhereInput | TrafficSnapshotScalarWhereInput[]
    OR?: TrafficSnapshotScalarWhereInput[]
    NOT?: TrafficSnapshotScalarWhereInput | TrafficSnapshotScalarWhereInput[]
    id?: IntFilter<"TrafficSnapshot"> | number
    airportId?: IntFilter<"TrafficSnapshot"> | number
    timestamp?: DateTimeFilter<"TrafficSnapshot"> | Date | string
    arrivals?: IntFilter<"TrafficSnapshot"> | number
    departures?: IntFilter<"TrafficSnapshot"> | number
    overflights?: IntFilter<"TrafficSnapshot"> | number
    totalAircraft?: IntFilter<"TrafficSnapshot"> | number
    trafficScore?: IntFilter<"TrafficSnapshot"> | number
  }

  export type AirportCreateWithoutControllerSessionInput = {
    icao: string
    name?: string | null
    country?: string | null
    fir?: string | null
    TrafficSnapshot?: TrafficSnapshotCreateNestedManyWithoutAirportInput
  }

  export type AirportUncheckedCreateWithoutControllerSessionInput = {
    id?: number
    icao: string
    name?: string | null
    country?: string | null
    fir?: string | null
    TrafficSnapshot?: TrafficSnapshotUncheckedCreateNestedManyWithoutAirportInput
  }

  export type AirportCreateOrConnectWithoutControllerSessionInput = {
    where: AirportWhereUniqueInput
    create: XOR<AirportCreateWithoutControllerSessionInput, AirportUncheckedCreateWithoutControllerSessionInput>
  }

  export type AirportUpsertWithoutControllerSessionInput = {
    update: XOR<AirportUpdateWithoutControllerSessionInput, AirportUncheckedUpdateWithoutControllerSessionInput>
    create: XOR<AirportCreateWithoutControllerSessionInput, AirportUncheckedCreateWithoutControllerSessionInput>
    where?: AirportWhereInput
  }

  export type AirportUpdateToOneWithWhereWithoutControllerSessionInput = {
    where?: AirportWhereInput
    data: XOR<AirportUpdateWithoutControllerSessionInput, AirportUncheckedUpdateWithoutControllerSessionInput>
  }

  export type AirportUpdateWithoutControllerSessionInput = {
    icao?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fir?: NullableStringFieldUpdateOperationsInput | string | null
    TrafficSnapshot?: TrafficSnapshotUpdateManyWithoutAirportNestedInput
  }

  export type AirportUncheckedUpdateWithoutControllerSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    icao?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fir?: NullableStringFieldUpdateOperationsInput | string | null
    TrafficSnapshot?: TrafficSnapshotUncheckedUpdateManyWithoutAirportNestedInput
  }

  export type AirportCreateWithoutTrafficSnapshotInput = {
    icao: string
    name?: string | null
    country?: string | null
    fir?: string | null
    ControllerSession?: ControllerSessionCreateNestedManyWithoutAirportInput
  }

  export type AirportUncheckedCreateWithoutTrafficSnapshotInput = {
    id?: number
    icao: string
    name?: string | null
    country?: string | null
    fir?: string | null
    ControllerSession?: ControllerSessionUncheckedCreateNestedManyWithoutAirportInput
  }

  export type AirportCreateOrConnectWithoutTrafficSnapshotInput = {
    where: AirportWhereUniqueInput
    create: XOR<AirportCreateWithoutTrafficSnapshotInput, AirportUncheckedCreateWithoutTrafficSnapshotInput>
  }

  export type AirportUpsertWithoutTrafficSnapshotInput = {
    update: XOR<AirportUpdateWithoutTrafficSnapshotInput, AirportUncheckedUpdateWithoutTrafficSnapshotInput>
    create: XOR<AirportCreateWithoutTrafficSnapshotInput, AirportUncheckedCreateWithoutTrafficSnapshotInput>
    where?: AirportWhereInput
  }

  export type AirportUpdateToOneWithWhereWithoutTrafficSnapshotInput = {
    where?: AirportWhereInput
    data: XOR<AirportUpdateWithoutTrafficSnapshotInput, AirportUncheckedUpdateWithoutTrafficSnapshotInput>
  }

  export type AirportUpdateWithoutTrafficSnapshotInput = {
    icao?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fir?: NullableStringFieldUpdateOperationsInput | string | null
    ControllerSession?: ControllerSessionUpdateManyWithoutAirportNestedInput
  }

  export type AirportUncheckedUpdateWithoutTrafficSnapshotInput = {
    id?: IntFieldUpdateOperationsInput | number
    icao?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    fir?: NullableStringFieldUpdateOperationsInput | string | null
    ControllerSession?: ControllerSessionUncheckedUpdateManyWithoutAirportNestedInput
  }

  export type ControllerSessionCreateManyAirportInput = {
    id?: number
    callsign: string
    positionType: string
    startTime: Date | string
    endTime?: Date | string | null
  }

  export type TrafficSnapshotCreateManyAirportInput = {
    id?: number
    timestamp?: Date | string
    arrivals: number
    departures: number
    overflights: number
    totalAircraft: number
    trafficScore: number
  }

  export type ControllerSessionUpdateWithoutAirportInput = {
    callsign?: StringFieldUpdateOperationsInput | string
    positionType?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ControllerSessionUncheckedUpdateWithoutAirportInput = {
    id?: IntFieldUpdateOperationsInput | number
    callsign?: StringFieldUpdateOperationsInput | string
    positionType?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ControllerSessionUncheckedUpdateManyWithoutAirportInput = {
    id?: IntFieldUpdateOperationsInput | number
    callsign?: StringFieldUpdateOperationsInput | string
    positionType?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TrafficSnapshotUpdateWithoutAirportInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivals?: IntFieldUpdateOperationsInput | number
    departures?: IntFieldUpdateOperationsInput | number
    overflights?: IntFieldUpdateOperationsInput | number
    totalAircraft?: IntFieldUpdateOperationsInput | number
    trafficScore?: IntFieldUpdateOperationsInput | number
  }

  export type TrafficSnapshotUncheckedUpdateWithoutAirportInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivals?: IntFieldUpdateOperationsInput | number
    departures?: IntFieldUpdateOperationsInput | number
    overflights?: IntFieldUpdateOperationsInput | number
    totalAircraft?: IntFieldUpdateOperationsInput | number
    trafficScore?: IntFieldUpdateOperationsInput | number
  }

  export type TrafficSnapshotUncheckedUpdateManyWithoutAirportInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    arrivals?: IntFieldUpdateOperationsInput | number
    departures?: IntFieldUpdateOperationsInput | number
    overflights?: IntFieldUpdateOperationsInput | number
    totalAircraft?: IntFieldUpdateOperationsInput | number
    trafficScore?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}