import CommonSpace, { PageTitleForCommonSpace } from '../../components/common-space/common-space';
import EditProductForm from '../../components/edit-product-form/edit-product-form';
import { UserStatus } from '../../components/header/header';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

export default function EditProduct(): JSX.Element {
  return (
    <CommonSpace
      userStatus={UserStatus.Admin}
      pageTitle={PageTitleForCommonSpace.EditProduct}
    >
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.EditProduct}/>
      <EditProductForm />
    </CommonSpace>
  );
}
