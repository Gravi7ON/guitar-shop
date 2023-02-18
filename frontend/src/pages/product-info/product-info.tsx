import CommentList from '../../components/comment-list/comment-list';
import Comment from '../../components/comment/comment';
import CommonSpace from '../../components/common-space/common-space';
import ProductInfoCard from '../../components/product-info-card/product-info-card';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

export default function ProductInfo(): JSX.Element {
  return (
    <CommonSpace>
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.Product}/>
      <ProductInfoCard />
      <CommentList>
        <Comment />
      </CommentList>
    </CommonSpace>
  );
}
