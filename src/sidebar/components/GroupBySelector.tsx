import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import { GroupBy } from './Sidebar';

export interface IGroupBySelectorDataProps {
  readonly groupBy: GroupBy;
}

export interface IGroupBySelectorCallbackProps {
  readonly onGroupByUpdate: (value: string) => () => void;
}

type GroupBySelectorProps = IGroupBySelectorCallbackProps & IGroupBySelectorDataProps;

export const GroupBySelector: React.SFC<GroupBySelectorProps> = (props: GroupBySelectorProps) => (
  <InputGroup>
    <FormControl
      className="sidebar__default-cursor"
      placeholder={props.groupBy}
      aria-label="Group by"
      aria-describedby="group-by-dropdown"
      readOnly
    />
    <InputGroup.Append>
      <DropdownButton id="group-by-dropdown" title="Group By">
        {Object.keys(GroupBy).map((key: keyof typeof GroupBy) => (
          <Dropdown.Item
            key={key}
            onSelect={props.onGroupByUpdate(GroupBy[key])}
            href={'#/' + key}>
            {key}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </InputGroup.Append>
  </InputGroup>
);

GroupBySelector.displayName = 'GroupBySelector';
// @ts-ignore
GroupBySelector.propTypes = {
  groupBy: PropTypes.string.isRequired,
  onGroupByUpdate: PropTypes.func.isRequired,
};
