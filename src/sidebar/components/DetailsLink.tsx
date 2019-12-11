import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { IconSpinner } from '../../_shared/components/Spinner';

interface IDetailsLinkProps {
  readonly isFetchingDetails: boolean;
  readonly onLinkClick: (options: IDetailsOptions) => void;
  readonly text: string;
}

export enum DetailsOptions {
  Title = 'Title',
  Category = 'Category',
  Content = 'Content',
  Links = 'Links',
}

export interface IDetailsOptions {
  readonly title: boolean;
  readonly category: boolean;
  readonly content: boolean;
  readonly links: boolean;
}

interface IDetailsLinksState extends IDetailsOptions {
}

const getClassNames = (isFetching: boolean): string => {
  if (isFetching) {
    return 'sidebar__info-group-detail-item sidebar__info-group-detail-item--is-loading';
  }
  return 'sidebar__info-group-detail-item';
};

export class DetailsLink extends React.PureComponent<IDetailsLinkProps, IDetailsLinksState> {
  static displayName = 'DetailsLink';
  static propTypes = {
    isFetchingDetails: PropTypes.bool.isRequired,
    onLinkClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  constructor(props: IDetailsLinkProps) {
    super(props);

    this.state = {
      title: false,
      category: false,
      content: false,
      links: false,
    };
  }

  private handleToggle = (attribute: DetailsOptions): void => {
    switch (attribute) {
      case DetailsOptions.Title: {
        const currentLinksState = this.state.title;
        return this.setState(() => ({ title: !currentLinksState }));
      }
      case DetailsOptions.Category: {
        const currentLinksState = this.state.category;
        return this.setState(() => ({ category: !currentLinksState }));
      }

      case DetailsOptions.Content: {
        const currentLinksState = this.state.content;
        return this.setState(() => ({ content: !currentLinksState }));
      }

      case DetailsOptions.Links: {
        const currentLinksState = this.state.links;
        return this.setState(() => ({ links: !currentLinksState }));
      }

      default: {
        return;
      }
    }
  };

  render() {
    const { isFetchingDetails, onLinkClick, text } = this.props;
    return (
      <div>
        <div
          className={getClassNames(isFetchingDetails)}
          onClick={() => onLinkClick(this.state)}
        >
          {text + ' '}
          {isFetchingDetails ? <IconSpinner/> : <i className="fas fa-file-download"/>}
        </div>
        <div className="sidebar__info-group-details-wrapper">
          <div className="sidebar__info-group-details-container">
            with:
          </div>
        </div>
        <Form>
          <Form.Check
            type="checkbox" inline
            label={DetailsOptions.Title} id="withTitle"
            checked={this.state.title}
            onChange={() => this.handleToggle(DetailsOptions.Title)}
          />
          <Form.Check
            type="checkbox" inline
            label={DetailsOptions.Category} id="withCategory"
            checked={this.state.category}
            onChange={() => this.handleToggle(DetailsOptions.Category)}
          />
          <Form.Check
            type="checkbox" inline
            label={DetailsOptions.Content} id="withContent"
            checked={this.state.content}
            onChange={() => this.handleToggle(DetailsOptions.Content)}
          />
          <Form.Check
            type="checkbox" inline
            label={DetailsOptions.Links} id="withLinks"
            checked={this.state.links}
            onChange={() => this.handleToggle(DetailsOptions.Links)}
          />
        </Form>
      </div>
    );
  }
}
