import {Monad, MonadConstructor} from "./monad";

export class MaybeConstructorImpl extends MonadConstructor<Maybe<any>> {
    return<A>(a: A): Monad<Maybe<any>, A> {
        return new Just(a);
    }

    fail<A>(): Monad<Maybe<any>, A> {
        return new Nothing();
    }
}

const MaybeConstructor = new MaybeConstructorImpl();

export abstract class Maybe<A> extends Monad<Maybe<A>, A> {
    constructor() {
        super(MaybeConstructor);
    }
}

export class Just<A> extends Maybe<A> {
    constructor(protected value: A) {
        super();
    }

    bind<B>(f: (a: A) => Monad<Maybe<A>, B>): Monad<Maybe<A>, B> {
        return f(this.value);
    }

    /* and */
    then<B>(mb: Monad<Maybe<A>, B>): Monad<Maybe<A>, B> ;
    then<A>(mb: Monad<Maybe<A>, A>): Monad<Maybe<A>, A> ;
    then(mb: Monad<Maybe<A>, A>): Monad<Maybe<A>, A> {
        return (mb instanceof Just) ? mb : this;
    }

    peek(f: (a: A) => void): this {
        f(this.value);
        return this;
    }
}

export class Nothing<A> extends Maybe<A> {
    bind<B>(_f: (a: A) => Monad<Maybe<A>, B>): Monad<Maybe<A>, B> {
        return this as any;
    }

    /* and */
    then<B>(_mb: Monad<Maybe<A>, B>): Monad<Maybe<A>, B> {
        return this as any;
    }

    peek(_f: (a: A) => void): this {
        return this;
    }
}
