'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">admin documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BlogCategoriesComponent.html" data-type="entity-link" >BlogCategoriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BlogCategoryFormsComponent.html" data-type="entity-link" >BlogCategoryFormsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BlogsComponent.html" data-type="entity-link" >BlogsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BlogsFormComponent.html" data-type="entity-link" >BlogsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrandFormsComponent.html" data-type="entity-link" >BrandFormsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrandsComponent.html" data-type="entity-link" >BrandsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoriesComponent.html" data-type="entity-link" >CategoriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoriesFormsComponent.html" data-type="entity-link" >CategoriesFormsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorComponent.html" data-type="entity-link" >ColorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorsComponent.html" data-type="entity-link" >ColorsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorsFormsComponent.html" data-type="entity-link" >ColorsFormsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CouponFormsComponent.html" data-type="entity-link" >CouponFormsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CouponsComponent.html" data-type="entity-link" >CouponsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DateComponent.html" data-type="entity-link" >DateComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EnquiriesComponent.html" data-type="entity-link" >EnquiriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" >ForgotPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormGroupComponent.html" data-type="entity-link" >FormGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputComponent.html" data-type="entity-link" >InputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutComponent.html" data-type="entity-link" >LayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderComponent.html" data-type="entity-link" >LoaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrdersComponent.html" data-type="entity-link" >OrdersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PasswordComponent.html" data-type="entity-link" >PasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductComponent.html" data-type="entity-link" >ProductComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductFormsComponent.html" data-type="entity-link" >ProductFormsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductsComponent.html" data-type="entity-link" >ProductsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RatingComponent.html" data-type="entity-link" >RatingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" >ResetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectComponent.html" data-type="entity-link" >SelectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SubnavComponent.html" data-type="entity-link" >SubnavComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TagFormsComponent.html" data-type="entity-link" >TagFormsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TagsComponent.html" data-type="entity-link" >TagsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextAreaComponent.html" data-type="entity-link" >TextAreaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserComponent.html" data-type="entity-link" >UserComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserFormsComponent.html" data-type="entity-link" >UserFormsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersComponent.html" data-type="entity-link" >UsersComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/ControlValueAccessorDirective.html" data-type="entity-link" >ControlValueAccessorDirective</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BlogService.html" data-type="entity-link" >BlogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommonService.html" data-type="entity-link" >CommonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EnquiryService.html" data-type="entity-link" >EnquiryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoaderService.html" data-type="entity-link" >LoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAddress.html" data-type="entity-link" >IAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthStoreState.html" data-type="entity-link" >IAuthStoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBackendError.html" data-type="entity-link" >IBackendError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBackendSuccess.html" data-type="entity-link" >IBackendSuccess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBlog.html" data-type="entity-link" >IBlog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBlogCategory.html" data-type="entity-link" >IBlogCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBlogStoreState.html" data-type="entity-link" >IBlogStoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBulkDeleteResponse.html" data-type="entity-link" >IBulkDeleteResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICart.html" data-type="entity-link" >ICart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICartData.html" data-type="entity-link" >ICartData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IColor.html" data-type="entity-link" >IColor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICommonStoreState.html" data-type="entity-link" >ICommonStoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IControlItem.html" data-type="entity-link" >IControlItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICoupon.html" data-type="entity-link" >ICoupon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateAddress.html" data-type="entity-link" >ICreateAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateBlog.html" data-type="entity-link" >ICreateBlog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateBlogCategory.html" data-type="entity-link" >ICreateBlogCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateCart.html" data-type="entity-link" >ICreateCart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateCommonProductSup.html" data-type="entity-link" >ICreateCommonProductSup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateCoupon.html" data-type="entity-link" >ICreateCoupon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateProduct.html" data-type="entity-link" >ICreateProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateReview.html" data-type="entity-link" >ICreateReview</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomerStoreState.html" data-type="entity-link" >ICustomerStoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IData.html" data-type="entity-link" >IData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDeleteCatProductRequest.html" data-type="entity-link" >IDeleteCatProductRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEnquiry.html" data-type="entity-link" >IEnquiry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IForgotPassword.html" data-type="entity-link" >IForgotPassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogin.html" data-type="entity-link" >ILogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INamedProductAttr.html" data-type="entity-link" >INamedProductAttr</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderItemResponse.html" data-type="entity-link" >IOrderItemResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderResponse.html" data-type="entity-link" >IOrderResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProduct.html" data-type="entity-link" >IProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProductBrand.html" data-type="entity-link" >IProductBrand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProductCategory.html" data-type="entity-link" >IProductCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProductStoreState.html" data-type="entity-link" >IProductStoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRegister.html" data-type="entity-link" >IRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResetPassword.html" data-type="entity-link" >IResetPassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IReview.html" data-type="entity-link" >IReview</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITag.html" data-type="entity-link" >ITag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateCartRequest.html" data-type="entity-link" >IUpdateCartRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateUser.html" data-type="entity-link" >IUpdateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserStoreState.html" data-type="entity-link" >IUserStoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/TimesincePipe.html" data-type="entity-link" >TimesincePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});