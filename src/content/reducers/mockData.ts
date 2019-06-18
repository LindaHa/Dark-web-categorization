import {
  IPage,
  Page
} from '../../models/page';
import * as Immutable from 'immutable';

export const mockPages = Immutable.Set<IPage>([
  new Page({
    id: '9ed26dd9-738a-49f1-91a6-91ed5793fe5d',
    description: 'Sleep some',
    url: 'xordoquy.onion',
    categories: Immutable.Set<string>(['guns, drugs']),
    links: Immutable.Set<Uuid>(['a07f0bc2-8bdb-4a0e-85f6-a037d71affe9, a077a831-6d9f-4d9c-ab1d-9ec3fb6abd31'])
  }),
  new Page({id: 'a07f0bc2-8bdb-4a0e-85f6-a037d71affe9', description: 'Sleep more', url: 'xordoquy.onion/guns', categories: Immutable.Set<string>(['guns'])}),
  new Page({
    id: 'a077a831-6d9f-4d9c-ab1d-9ec3fb6abd31',
    description: 'Sleep less',
    url: 'xordoquy.onion/drugs',
    categories: Immutable.Set<string>(['drugs']),
    links: Immutable.Set<Uuid>(['f5e24f18-9878-4750-82ea-8026d0472baa, a077a831-6dsd-4d9c-ab1d-9ec3fb6abd31'])
  }),
  new Page({
    id: 'b4889aed-c92f-4533-a5e0-0f6b600cd276',
    description: 'Wow some',
    url: 'wow.onion',
    categories: Immutable.Set<string>(['drugs, hacking, money laundry']),
    links: Immutable.Set<Uuid>(['f5e24f18-9878-4750-82ea-8026d0472baa, 3f35e4ff-93fb-4796-9c11-385ada0392df, e12daf5d-ac6b-4acb-b789-725917f314d4'])
  }),
  new Page({id: 'f5e24f18-9878-4750-82ea-8026d0472baa', description: 'Wow better', url: 'wow.onion/drugs', categories: Immutable.Set<string>(['drugs'])}),
  new Page({
    id: '3f35e4ff-93fb-4796-9c11-385ada0392df',
    description: 'Wow less',
    url: 'wow.onion/hacking',
    categories: Immutable.Set<string>(['hacking']),
    links: Immutable.Set<Uuid>(['af35e4ff-93sb-4796-asf1-385ada0392df, 67589aed-c92f-df33-a5e0-0f6b600cd276'])
  }),
  new Page({id: 'e12daf5d-ac6b-4acb-b789-725917f314d4', description: 'Wow cleaner', url: 'wow.onion/laundry', categories: Immutable.Set<string>(['money laundry'])}),
  new Page({id: '9ed26dd9-738a-49f1-91a6-91ed5793fe5d', description: 'Bling some', url: 'bling.onion', categories: Immutable.Set<string>(['guns']), links: Immutable.Set<Uuid>(['a6df0bc2-8bdb-4a0e-85f6-a037d71affe9'])}),
  new Page({id: 'a6df0bc2-8bdb-4a0e-85f6-a037d71affe9', description: 'Bling more', url: 'bling.onion/guns', categories: Immutable.Set<string>(['guns'])}),
  new Page({
    id: 'abef0bc2-8bdb-4a0e-85f6-a037d71affe9',
    description: 'Drive some',
    url: 'road.onion/',
    categories: Immutable.Set<string>(['guns, porn, drugs']),
    links: Immutable.Set<Uuid>(['a079dbc2-8bdb-4a0e-85f6-a03ets1afer9, a07f0as2-8sfb-4a0e-85f6-a037d71a4dd9, a077a831-6dsd-4d9c-ab1d-9ec3fb6abd31'])
  }),
  new Page({id: 'a079dbc2-8bdb-4a0e-85f6-a03ets1afer9', description: 'Drive faster', url: 'road.onion/guns', categories: Immutable.Set<string>(['guns'])}),
  new Page({id: 'a07f0as2-8sfb-4a0e-85f6-a037d71a4dd9', description: 'Drive less', url: 'road.onion/porn', categories: Immutable.Set<string>(['guns']), links: Immutable.Set<Uuid>(['9ed26dd9-738a-49f1-91a6-91ed5793fe5d'])}),
  new Page({id: 'a077a831-6dsd-4d9c-ab1d-9ec3fb6abd31', description: 'Drive better', url: 'road.onion/drugs', categories: Immutable.Set<string>(['drugs'])}),
  new Page({
    id: '67589aed-c92f-df33-a5e0-0f6b600cd276',
    description: 'Code some',
    url: 'for4.onion',
    categories: Immutable.Set<string>(['drugs, hacking']),
    links: Immutable.Set<Uuid>(['gbc24f18-df78-47sa-82ea-8026d047a344, af35e4ff-93sb-4796-asf1-385ada0392df'])
  }),
  new Page({id: 'gbc24f18-df78-47sa-82ea-8026d047a344', description: 'Code better', url: 'for4.onion/drugs', categories: Immutable.Set<string>(['drugs'])}),
  new Page({id: 'af35e4ff-93sb-4796-asf1-385ada0392df', description: 'Code faster', url: 'for4.onion/hacking', categories: Immutable.Set<string>(['hacking']), links: Immutable.Set<Uuid>(['3f35e4ff-93fb-4796-9c11-385ada0392df'])}),
  new Page({id: 'e12daf5d-ac6b-4acb-b789-s45d43f314d4', description: 'Do some', url: 'blrn.onion', categories: Immutable.Set<string>(['services']), links: Immutable.Set<Uuid>(['af340a1c-ce9a-4c58-b82c-8d5435ds4daf'])}),
  new Page({id: 'af340a1c-ce9a-4c58-b82c-8d5435ds4daf', description: 'Do better', url: 'blrn.onion/services', categories: Immutable.Set<string>(['services']), links: Immutable.Set<Uuid>(['af35e4ff-93sb-4796-asf1-385ada0392df'])}),
]);
