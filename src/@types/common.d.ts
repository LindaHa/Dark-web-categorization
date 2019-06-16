/*
 * <COMMON TYPES>
 */

/*
 * Universally unique identifier usually used in id fields.
 * (e.g.: 0a82ea92-5857-45d7-842d-115f437b5cb8)
 */
type Uuid = string;

type Action = {
  type: string;
  payload?: any;
};

interface IRecordFunctions<TRecordData, TRecordFunctions> {
  // We can return the data of a record
  toObject: () => TRecordData;
  // We can merge the record data with other record data
  with: (data: Partial<TRecordData>) => TRecordFunctions & TRecordData;
}


declare module 'immutable-prop-types';

/**
 * Type that ensures you do not forget to add a property to React.propTypes
 * when it is defined in IProps of the component.
 *
 * @type IProps component's props type
 */
declare module 'prop-type-shape' {
  import { Validator } from 'prop-types';
  global {
    type PropTypesShape<IProps> = {
      [P in keyof IProps]-?: Validator<any>;
    };
  }
}
