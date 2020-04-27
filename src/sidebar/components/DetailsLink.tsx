import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INodeDetailsOptions } from './CommunityDetailsOptions';
import { OptionsModal } from '../OptionsModal';
import { INode } from '../../models/node';
import {
  removeEmptyPropertiesFromDetails,
  removeEmptyPropertiesFromManyDetails
} from '../utils/detailsHelpers';
import { download } from '../../_shared/utils/download';

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

export interface IDetailsLinkDataProps {
  readonly isFetchingDetails: boolean;
  readonly mode: DetailsMode;
  readonly selectedNode: INode;
}

export interface IDetailsLinkCallbackProps {
  readonly fetchDetails: (options: INodeDetailsOptions) => Promise<Action>;
}

type DetailsLinkProps = IDetailsLinkDataProps & IDetailsLinkCallbackProps;

interface IDetailsLinksState {
  readonly isModalShown: boolean;
  readonly details: INodeDetailsOptions;
}

const getClassNames = (isFetching: boolean): string => {
  if (isFetching) {
    return 'sidebar__info-group-detail-item sidebar__info-group-detail-item--is-loading';
  }
  return 'sidebar__info-group-detail-item';
};

export class DetailsLink extends React.PureComponent<DetailsLinkProps, IDetailsLinksState> {
  static displayName = 'DetailsLink';
  static propTypes = {
    isFetchingDetails: PropTypes.bool.isRequired,
    mode: PropTypes.number.isRequired,
    selectedNode: PropTypes.object.isRequired,

    fetchDetails: PropTypes.func.isRequired,
  };

  constructor(props: DetailsLinkProps) {
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

  componentDidUpdate(prevProps: Readonly<DetailsLinkProps>): void {
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

  private _handleClickDownload = (options: INodeDetailsOptions): void => {
    const { fetchDetails, mode, selectedNode } = this.props;

    fetchDetails(options).then((action: Action) => {
      const filePrefix = mode === DetailsMode.Page ? 'page' : 'community';
      const filename = `${filePrefix}_details_for_node-${selectedNode.id}.json`;
      const responseDetails = action.payload.details && action.payload.details.toJS();
      const resultWithoutNulls = mode === DetailsMode.Community
        ? removeEmptyPropertiesFromManyDetails(responseDetails)
        : removeEmptyPropertiesFromDetails(responseDetails);

      download(filename, JSON.stringify(resultWithoutNulls));
    });
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
    const modeDependentText = (mode === DetailsMode.Page ? 'Get more details' : 'Get all members');
    return (
      <div>
        <div
          className={getClassNames(isFetchingDetails)}
          onClick={this._showModal}
        >
          {modeDependentText}
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
    );
  }
}
