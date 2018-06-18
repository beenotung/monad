export abstract class Monad<M extends Monad<any, any>, A> {
    /* >>= */
    abstract bind<B>(f: (a: A) => Monad<M, B>): Monad<M, B>;

    /* >> */
    abstract then<B>(mb: Monad<M, B>): Monad<M, B>;

    constructor(protected constructor: MonadConstructor<M>) {
    }

    map<B>(f: (a: A) => B): Monad<M, B> {
        return this.bind(a => this.constructor.return(f(a)))
    }

    abstract peek(f: (a: A) => void): this;
}

export abstract class MonadConstructor<M extends Monad<any, any>> {
    /* return */
    abstract return<A>(a: A): Monad<M, A>;

    /* fail */
    abstract fail<A>(reason: string): Monad<M, A>;
}
