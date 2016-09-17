import { ApiModule as ProdModule } from './module';
import { ApiModule as DevModule } from '../src/module';

export let ApiModule = process.env.NODE_ENV !== 'production' ? DevModule : ProdModule;
