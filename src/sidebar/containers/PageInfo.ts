import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { IState } from '../../_shared/models/IState';
import {
  IPageInfoDataProps,
  PageInfo as PageInfoComponent,
} from '../components/PageInfo';

const mapStateToProps = (state: IState): IPageInfoDataProps => {
  const { pages } = state.nodes;
  const selectedPage = pages.get(state.selectedNode)!;
  // @ts-ignore
  const pageLinks: Immutable.Set<Url> = selectedPage.links
    .map((linkUrl: Url) => {
      const linkedPage = pages.get(linkUrl);
      return linkedPage && linkedPage.url;
    })
    .filter((url: string | undefined) => !!url);

  return {
    selectedPage,
    pageLinks,
  };
};

export const PageInfo = connect(mapStateToProps)(PageInfoComponent);
