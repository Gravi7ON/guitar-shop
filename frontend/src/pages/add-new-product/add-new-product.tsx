import AddProductForm from '../../components/add-product-form/add-product-form';
import CommonSpace, { PageTitleForCommonSpace } from '../../components/common-space/common-space';
import { UserStatus } from '../../components/header/header';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

export default function AddNewProduct(): JSX.Element {
  return (
    <CommonSpace
      userStatus={UserStatus.Admin}
      pageTitle={PageTitleForCommonSpace.AddNewProduct}
    >
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.AddNewProduct}/>
      <AddProductForm />
    </CommonSpace>
  );
}
