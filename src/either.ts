import {Monad, MonadConstructor} from "./monad";

export class EitherConstructorImpl extends MonadConstructor<Either<any, any>> {
    return<A>(a: A): Monad<Either<any, any>, A> {
        return new Right(a);
    }

    fail<A>(reason: string): Monad<Either<any, any>, A> {
        return new Left(reason);
    }
}

export const EitherConstructor = new EitherConstructorImpl();

export abstract class Either<E, A> extends Monad<Either<E, A>, A> {
    abstract report(f: (e: E) => void): this;

    abstract getRight(): A;

    abstract getLeft(): E;

    abstract then<B>(mb: Either<E, B>): Either<E, B>;
    abstract then<B>(mb: Monad<Either<E, A>, B>): Monad<Either<E, A>, B> ;
}

export class Right<E, A> extends Either<E, A> {
    constructor(protected right: A) {
        super(EitherConstructor)
    }

    bind<B>(f: (a: A) => Monad<Either<E, A>, B>): Monad<Either<E, A>, B> {
        return f(this.right);
    }

    /* and */
    then<B>(mb: Either<E, B>): Either<E, B> {
        return mb;
    }

    peek(f: (a: A) => void): this {
        f(this.right);
        return this;
    }

    report(_f: (e: E) => void): this {
        return this;
    }

    getRight(): A {
        return this.right;
    }

    getLeft(): E {
        throw new Error('no left value');
    }
}

export class Left<E, A> extends Either<E, A> {
    constructor(protected left: E) {
        super(EitherConstructor)
    }

    bind<B>(_f: (a: A) => Monad<Either<E, A>, B>): Monad<Either<E, A>, B> {
        return this as any;
    }

    then<B>(_mb: Either<E, B>): Either<E, B> {
        return this as any;
    }

    peek(_f: (a: A) => void): this {
        return this;
    }

    report(f: (e: E) => void): this {
        f(this.left);
        return this;
    }

    getRight(): A {
        throw new Error('no right value');
    }

    getLeft(): E {
        return this.left;
    }
}

