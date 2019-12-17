import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { DetailsOptions } from './DetailsLink';

export interface ICommunityDetailsOptions {
  readonly title: boolean;
  readonly category: boolean;
  readonly content: boolean;
  readonly links: boolean;
  [key: string]: any;
}

interface ICommunityDetailsOptionsProps {
  readonly currentOptions: ICommunityDetailsOptions;

  readonly handleToggle: (attribute: DetailsOptions) => void;
}

export const CommunityDetailsOptions: React.SFC<ICommunityDetailsOptionsProps> = (props: ICommunityDetailsOptionsProps) => {
  const { currentOptions: { title, category, content, links }, handleToggle } = props;

  return (
    <div>
      <Form>
        <Form.Check
          type="checkbox" inline
          label={DetailsOptions.Title} id="withTitle"
          checked={title}
          onChange={() => handleToggle(DetailsOptions.Title)}
        />
        <Form.Check
          type="checkbox" inline
          label={DetailsOptions.Category} id="withCategory"
          checked={category}
          onChange={() => handleToggle(DetailsOptions.Category)}
        />
        <Form.Check
          type="checkbox" inline
          label={DetailsOptions.Content} id="withContent"
          checked={content}
          onChange={() => handleToggle(DetailsOptions.Content)}
        />
        <Form.Check
          type="checkbox" inline
          label={DetailsOptions.Links} id="withLinks"
          checked={links}
          onChange={() => handleToggle(DetailsOptions.Links)}
        />
      </Form>
    </div>
  );
};

CommunityDetailsOptions.displayName = 'CommunityDetailsOptions';
CommunityDetailsOptions.propTypes = {
  currentOptions: PropTypes.object.isRequired,
  handleToggle: PropTypes.func.isRequired,
};