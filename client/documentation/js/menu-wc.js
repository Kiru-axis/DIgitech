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
                    <a href="index.html" data-type="index-link">client documentation</a>
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
                                <a href="components/BlogCardComponent.html" data-type="entity-link" >BlogCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BlogComponent.html" data-type="entity-link" >BlogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BlogsComponent.html" data-type="entity-link" >BlogsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CartComponent.html" data-type="entity-link" >CartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoriesComponent.html" data-type="entity-link" >CategoriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CheckoutComponent.html" data-type="entity-link" >CheckoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorComponent.html" data-type="entity-link" >ColorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompareComponent.html" data-type="entity-link" >CompareComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EnquiryComponent.html" data-type="entity-link" >EnquiryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FeaturedComponent.html" data-type="entity-link" >FeaturedComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" >ForgotPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormGroupComponent.html" data-type="entity-link" >FormGroupComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeroComponent.html" data-type="entity-link" >HeroComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputComponent.html" data-type="entity-link" >InputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderComponent.html" data-type="entity-link" >LoaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OffersComponent.html" data-type="entity-link" >OffersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PasswordComponent.html" data-type="entity-link" >PasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PopularComponent.html" data-type="entity-link" >PopularComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PrivacyComponent.html" data-type="entity-link" >PrivacyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductAccordionComponent.html" data-type="entity-link" >ProductAccordionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductComponent.html" data-type="entity-link" >ProductComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductReviewFormComponent.html" data-type="entity-link" >ProductReviewFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductReviewsComponent.html" data-type="entity-link" >ProductReviewsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductsComponent.html" data-type="entity-link" >ProductsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QtyCounterComponent.html" data-type="entity-link" >QtyCounterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RatingComponent.html" data-type="entity-link" >RatingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RefundComponent.html" data-type="entity-link" >RefundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterComponent.html" data-type="entity-link" >RegisterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" >ResetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectComponent.html" data-type="entity-link" >SelectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShippingComponent.html" data-type="entity-link" >ShippingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ShopComponent.html" data-type="entity-link" >ShopComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SingleProductComponent.html" data-type="entity-link" >SingleProductComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SliderComponent.html" data-type="entity-link" >SliderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpecialComponent.html" data-type="entity-link" >SpecialComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TermsPolicyComponent.html" data-type="entity-link" >TermsPolicyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextAreaComponent.html" data-type="entity-link" >TextAreaComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsedByComponent.html" data-type="entity-link" >UsedByComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserAddressComponent.html" data-type="entity-link" >UserAddressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserCompareComponent.html" data-type="entity-link" >UserCompareComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserHomeComponent.html" data-type="entity-link" >UserHomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserOrdersComponent.html" data-type="entity-link" >UserOrdersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserWishlistComponent.html" data-type="entity-link" >UserWishlistComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WishlistComponent.html" data-type="entity-link" >WishlistComponent</a>
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
                                <li class="link">
                                    <a href="directives/SwiperDirective.html" data-type="entity-link" >SwiperDirective</a>
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
                                <a href="interfaces/Author.html" data-type="entity-link" >Author</a>
                            </li>
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
                                <a href="interfaces/ICompare.html" data-type="entity-link" >ICompare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IControlItem.html" data-type="entity-link" >IControlItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateAddress.html" data-type="entity-link" >ICreateAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateBlog.html" data-type="entity-link" >ICreateBlog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateCart.html" data-type="entity-link" >ICreateCart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateCompare.html" data-type="entity-link" >ICreateCompare</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateEnquiry.html" data-type="entity-link" >ICreateEnquiry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateOrder.html" data-type="entity-link" >ICreateOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateProductBrand.html" data-type="entity-link" >ICreateProductBrand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateProductCategory.html" data-type="entity-link" >ICreateProductCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateReview.html" data-type="entity-link" >ICreateReview</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateWishlist.html" data-type="entity-link" >ICreateWishlist</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomerStoreState.html" data-type="entity-link" >ICustomerStoreState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDeleteCartProduct.html" data-type="entity-link" >IDeleteCartProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEnquiryStoreState.html" data-type="entity-link" >IEnquiryStoreState</a>
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
                                <a href="interfaces/IOrder.html" data-type="entity-link" >IOrder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderItems.html" data-type="entity-link" >IOrderItems</a>
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
                                <a href="interfaces/IProfileStoreState.html" data-type="entity-link" >IProfileStoreState</a>
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
                                <a href="interfaces/IUpdateCart.html" data-type="entity-link" >IUpdateCart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateUser.html" data-type="entity-link" >IUpdateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IWishlist.html" data-type="entity-link" >IWishlist</a>
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