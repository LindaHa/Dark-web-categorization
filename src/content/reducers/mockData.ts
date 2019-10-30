import {
  INode,
  Node
} from '../../models/node';
import * as Immutable from 'immutable';

export const mockNodes = Immutable.Set<INode>([
  new Node({
    id: 'xordoquy.onion',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ guns: 1 }),
    links: Immutable.Set<Uuid>(['xordoquy.onion/guns', 'xordoquy.onion/drugs']),
    membersCount: 1,
  }),
  new Node({
    id: 'xordoquy.onion/guns',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ guns: 1 }),
    membersCount: 1,
  }),
  new Node({
    id: 'xordoquy.onion/drugs',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ drugs: 1 }),
    links: Immutable.Set<Uuid>(['wow.onion/drugs', 'road.onion/drugs']),
    membersCount: 1,
  }),
  new Node({
    id: 'wow.onion',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ hacking: 1 }),
    links: Immutable.Set<Uuid>(['wow.onion/drugs', 'wow.onion/hacking', 'wow.onion/laundry']),
    membersCount: 1,
  }),
  new Node({
    id: 'wow.onion/drugs',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ drugs: 1 }),
    membersCount: 1,
  }),
  new Node({
    id: 'wow.onion/hacking',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ hacking: 1 }),
    links: Immutable.Set<Uuid>(['for4.onion/hacking', 'for4.onion']),
    membersCount: 1,
  }),
  new Node({
    id: 'wow.onion/laundry',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ ['money Laundry']: 1 }),
    membersCount: 1,
  }),
  new Node({
    id: 'bling.onion',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ guns: 1 }),
    links: Immutable.Set<Uuid>(['bling.onion/guns']),
    membersCount: 1,
  }),
  new Node({
    id: 'bling.onion/guns',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ guns: 1 }),
    membersCount: 1,
  }),
  new Node({
    id: 'road.onion/',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ porn: 1 }),
    links: Immutable.Set<Uuid>(['road.onion/guns', 'road.onion/porn', 'road.onion/drugs']),
    membersCount: 1,
  }),
  new Node({
    id: 'road.onion/guns',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ guns: 1 }),
    membersCount: 1,
  }),
  new Node({
    id: 'road.onion/porn',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ guns: 1 }),
    links: Immutable.Set<Uuid>(['xordoquy.onion']),
    membersCount: 1,
  }),
  new Node({
    id: 'road.onion/drugs',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ drugs: 1 }),
    membersCount: 1,
  }),
  new Node({
    id: 'for4.onion',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ hacking: 1 }),
    links: Immutable.Set<Uuid>(['for4.onion/drugs', 'for4.onion/hacking']),
    membersCount: 1,
  }),
  new Node({
    id: 'for4.onion/drugs',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ drugs: 1 }),
    membersCount: 1,
  }),
  new Node({
    id: 'for4.onion/hacking',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ hacking: 1 }),
    links: Immutable.Set<Uuid>(['wow.onion/hacking']),
    membersCount: 1,
  }),
  new Node({
    id: 'blrn.onion',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ services: 1 }),
    links: Immutable.Set<Uuid>(['blrn.onion/services']),
    membersCount: 1,
  }),
  new Node({
    id: 'blrn.onion/services',
    firstMembers: Immutable.List<INode>(),
    categories: Immutable.Map({ services: 1 }),
    links: Immutable.Set<Uuid>(['for4.onion/hacking']),
    membersCount: 1,
  }),
]);
