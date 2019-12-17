import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ICommunityDetailsOptions } from './CommunityDetailsOptions';
import { OptionsModal } from '../OptionsModal';
import { IconSpinner } from '../../_shared/components/Spinner';

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

interface IDetailsLinksState {
  readonly isModalShown: boolean;
  readonly details: ICommunityDetailsOptions;
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
      details: {
        title: false,
        category: false,
        content: false,
        links: false,
      },
      isModalShown: false,
    };
  }

  componentDidUpdate(prevProps: Readonly<IDetailsLinkProps>): void {
    if (prevProps.isFetchingDetails && !this.props.isFetchingDetails) {
      this.setState(() => ({ isModalShown: false }));
    }
  }

  private _handleToggle = (attribute: DetailsOptions): void => {
    const stateDetails = { ...this.state.details };
    switch (attribute) {
      case DetailsOptions.Title: {
        const currentLinksState = stateDetails.title;
        stateDetails.title = !currentLinksState;
        return this.setState(() => ({ details: stateDetails }));
      }
      case DetailsOptions.Category: {
        const currentLinksState = stateDetails.category;
        stateDetails.category = !currentLinksState;
        return this.setState(() => ({ details: stateDetails }));
      }

      case DetailsOptions.Content: {
        const currentLinksState = stateDetails.content;
        stateDetails.content = !currentLinksState;
        return this.setState(() => ({ details: stateDetails }));
      }

      case DetailsOptions.Links: {
        const currentLinksState = stateDetails.links;
        stateDetails.links = !currentLinksState;
        return this.setState(() => ({ details: stateDetails }));
      }

      default: {
        return;
      }
    }
  };

  private _handleClickDownload = (details: ICommunityDetailsOptions) => {
    this.props.onLinkClick(details);
  };

  private _hideModal = () => (
    this.setState(() => ({ isModalShown: false }))
  );

  private _showModal = () => (
    this.setState(() => ({ isModalShown: true }))
  );

  render() {
    const { isFetchingDetails, mode } = this.props;
    const { details, isModalShown } = this.state;
    const modeDependentText = (mode === DetailsMode.Page ? 'links' : 'members');
    const text = `Get all ${modeDependentText} `;
    return (
      <div>
        {
          mode === DetailsMode.Community
            ?
            <div>
              <div
                className={getClassNames(isFetchingDetails)}
                onClick={this._showModal}
              >
                {text}
              </div>
              <OptionsModal
                currentOptions={details}
                isModalShown={isModalShown}
                isFetchingDetails={isFetchingDetails}
                download={() => this._handleClickDownload(details)}
                handleToggle={this._handleToggle}
                onHide={this._hideModal}
              />
            </div>
            :
            <div
              className={getClassNames(isFetchingDetails)}
              onClick={() => this._handleClickDownload(details)}
            >
              {text}
              {isFetchingDetails ? <IconSpinner/> : <i className="fas fa-file-download"/>}
            </div>
        }
      </div>
    );
  }
}
