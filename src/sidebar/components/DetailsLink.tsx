import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { IconSpinner } from '../../_shared/components/Spinner';

interface IDetailsLinkProps {
  readonly isFetchingDetails: boolean;
  readonly onClick: () => void;
  readonly text: string;
}

export enum AvailablePageDetails {
  Title = 'Title',
  Category = 'Category',
  Content = 'Content',
  Links = 'Links',
}

interface IDesiredDetails {
  readonly title: boolean;
  readonly category: boolean;
  readonly content: boolean;
  readonly links: boolean;
}

interface IDetailsLinksState extends IDesiredDetails {
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
    onClick: PropTypes.func.isRequired,
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

  private handleToggle = (attribute: AvailablePageDetails): void => {
    switch (attribute) {
      case AvailablePageDetails.Title: {
        const currentLinksState = this.state.title;
        return this.setState(() => ({ title: !currentLinksState }));
      }
      case AvailablePageDetails.Category: {
        const currentLinksState = this.state.category;
        return this.setState(() => ({ category: !currentLinksState }));
      }

      case AvailablePageDetails.Content: {
        const currentLinksState = this.state.content;
        return this.setState(() => ({ content: !currentLinksState }));
      }

      case AvailablePageDetails.Links: {
        const currentLinksState = this.state.links;
        return this.setState(() => ({ links: !currentLinksState }));
      }

      default: {
        return;
      }
    }
  };

  render() {
    const { isFetchingDetails, onClick, text } = this.props;
    return (
      <div>
        <div
          className={getClassNames(isFetchingDetails)}
          onClick={onClick}
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
            label={AvailablePageDetails.Title} id="withTitle"
            checked={this.state.title}
            onChange={() => this.handleToggle(AvailablePageDetails.Title)}
          />
          <Form.Check
            type="checkbox" inline
            label={AvailablePageDetails.Category} id="withCategory"
            checked={this.state.category}
            onChange={() => this.handleToggle(AvailablePageDetails.Category)}
          />
          <Form.Check
            type="checkbox" inline
            label={AvailablePageDetails.Content} id="withContent"
            checked={this.state.content}
            onChange={() => this.handleToggle(AvailablePageDetails.Content)}
          />
          <Form.Check
            type="checkbox" inline
            label={AvailablePageDetails.Links} id="withLinks"
            checked={this.state.links}
            onChange={() => this.handleToggle(AvailablePageDetails.Links)}
          />
        </Form>
      </div>
    );
  }
}
