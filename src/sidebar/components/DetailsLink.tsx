import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IconSpinner } from '../../_shared/components/Spinner';
import {
  CommunityDetailsOptions,
  ICommunityDetailsOptions
} from './CommunityDetailsOptions';

export enum DetailsMode {
  Page,
  Community,
}

export enum DetailsOptions {
  Title = 'Title',
  Category = 'Category',
  Content = 'Content',
  Links = 'Links',
}

interface IDetailsLinkProps {
  readonly isFetchingDetails: boolean;
  readonly onLinkClick: (options: ICommunityDetailsOptions) => void;
  readonly mode: DetailsMode;
}

interface IDetailsLinksState extends ICommunityDetailsOptions {
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
    mode: PropTypes.number.isRequired,
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
    const { isFetchingDetails, onLinkClick, mode } = this.props;
    const modeDependentText = (mode === DetailsMode.Page ? 'links' : 'members');
    const text = `Get all ${modeDependentText} `;
    return (
      <div>
        <div
          className={getClassNames(isFetchingDetails)}
          onClick={() => onLinkClick(this.state)}
        >
          {text}
          {isFetchingDetails ? <IconSpinner/> : <i className="fas fa-file-download"/>}
        </div>
        {
          mode === DetailsMode.Community
            ? <CommunityDetailsOptions
              currentOptions={this.state}
              isFetchingDetails={isFetchingDetails}
              handleToggle={this.handleToggle}
            />
            : <></>
        }
      </div>
    );
  }
}
