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
                    <a href="index.html" data-type="index-link">api documentation</a>
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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-6b9cfa18cc513150f9db1cdd43e1319cea7132139b23138e75adcd8c085d382520ee53cc3bce4a301ea5301f84131d307a07b5be24307356c2aacdd3f31f5224"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-6b9cfa18cc513150f9db1cdd43e1319cea7132139b23138e75adcd8c085d382520ee53cc3bce4a301ea5301f84131d307a07b5be24307356c2aacdd3f31f5224"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6b9cfa18cc513150f9db1cdd43e1319cea7132139b23138e75adcd8c085d382520ee53cc3bce4a301ea5301f84131d307a07b5be24307356c2aacdd3f31f5224"' :
                                            'id="xs-controllers-links-module-AuthModule-6b9cfa18cc513150f9db1cdd43e1319cea7132139b23138e75adcd8c085d382520ee53cc3bce4a301ea5301f84131d307a07b5be24307356c2aacdd3f31f5224"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-6b9cfa18cc513150f9db1cdd43e1319cea7132139b23138e75adcd8c085d382520ee53cc3bce4a301ea5301f84131d307a07b5be24307356c2aacdd3f31f5224"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-6b9cfa18cc513150f9db1cdd43e1319cea7132139b23138e75adcd8c085d382520ee53cc3bce4a301ea5301f84131d307a07b5be24307356c2aacdd3f31f5224"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6b9cfa18cc513150f9db1cdd43e1319cea7132139b23138e75adcd8c085d382520ee53cc3bce4a301ea5301f84131d307a07b5be24307356c2aacdd3f31f5224"' :
                                        'id="xs-injectables-links-module-AuthModule-6b9cfa18cc513150f9db1cdd43e1319cea7132139b23138e75adcd8c085d382520ee53cc3bce4a301ea5301f84131d307a07b5be24307356c2aacdd3f31f5224"' }>
                                        <li class="link">
                                            <a href="injectables/AtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BlogCategoriesModule.html" data-type="entity-link" >BlogCategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BlogCategoriesModule-79e8a30237f0342d197f301c375d83f1599343a50b8cd3c6945df829b8a8baeb0e594df33bbce417bf0b811f65f51f7d04b389468820ac5bd183a208c8796fc1"' : 'data-bs-target="#xs-controllers-links-module-BlogCategoriesModule-79e8a30237f0342d197f301c375d83f1599343a50b8cd3c6945df829b8a8baeb0e594df33bbce417bf0b811f65f51f7d04b389468820ac5bd183a208c8796fc1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BlogCategoriesModule-79e8a30237f0342d197f301c375d83f1599343a50b8cd3c6945df829b8a8baeb0e594df33bbce417bf0b811f65f51f7d04b389468820ac5bd183a208c8796fc1"' :
                                            'id="xs-controllers-links-module-BlogCategoriesModule-79e8a30237f0342d197f301c375d83f1599343a50b8cd3c6945df829b8a8baeb0e594df33bbce417bf0b811f65f51f7d04b389468820ac5bd183a208c8796fc1"' }>
                                            <li class="link">
                                                <a href="controllers/BlogCategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogCategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BlogCategoriesModule-79e8a30237f0342d197f301c375d83f1599343a50b8cd3c6945df829b8a8baeb0e594df33bbce417bf0b811f65f51f7d04b389468820ac5bd183a208c8796fc1"' : 'data-bs-target="#xs-injectables-links-module-BlogCategoriesModule-79e8a30237f0342d197f301c375d83f1599343a50b8cd3c6945df829b8a8baeb0e594df33bbce417bf0b811f65f51f7d04b389468820ac5bd183a208c8796fc1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BlogCategoriesModule-79e8a30237f0342d197f301c375d83f1599343a50b8cd3c6945df829b8a8baeb0e594df33bbce417bf0b811f65f51f7d04b389468820ac5bd183a208c8796fc1"' :
                                        'id="xs-injectables-links-module-BlogCategoriesModule-79e8a30237f0342d197f301c375d83f1599343a50b8cd3c6945df829b8a8baeb0e594df33bbce417bf0b811f65f51f7d04b389468820ac5bd183a208c8796fc1"' }>
                                        <li class="link">
                                            <a href="injectables/BlogCategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogCategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BlogsModule.html" data-type="entity-link" >BlogsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BlogsModule-9bc463847c12180dc499a1831fb05f173dbaca64a7930a4b1f66099d711ce0ceef7ee5b656fb49828c0e83d1c695f94a4d3f066efe59f011a39aa6698b45f61d"' : 'data-bs-target="#xs-controllers-links-module-BlogsModule-9bc463847c12180dc499a1831fb05f173dbaca64a7930a4b1f66099d711ce0ceef7ee5b656fb49828c0e83d1c695f94a4d3f066efe59f011a39aa6698b45f61d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BlogsModule-9bc463847c12180dc499a1831fb05f173dbaca64a7930a4b1f66099d711ce0ceef7ee5b656fb49828c0e83d1c695f94a4d3f066efe59f011a39aa6698b45f61d"' :
                                            'id="xs-controllers-links-module-BlogsModule-9bc463847c12180dc499a1831fb05f173dbaca64a7930a4b1f66099d711ce0ceef7ee5b656fb49828c0e83d1c695f94a4d3f066efe59f011a39aa6698b45f61d"' }>
                                            <li class="link">
                                                <a href="controllers/BlogsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BlogsModule-9bc463847c12180dc499a1831fb05f173dbaca64a7930a4b1f66099d711ce0ceef7ee5b656fb49828c0e83d1c695f94a4d3f066efe59f011a39aa6698b45f61d"' : 'data-bs-target="#xs-injectables-links-module-BlogsModule-9bc463847c12180dc499a1831fb05f173dbaca64a7930a4b1f66099d711ce0ceef7ee5b656fb49828c0e83d1c695f94a4d3f066efe59f011a39aa6698b45f61d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BlogsModule-9bc463847c12180dc499a1831fb05f173dbaca64a7930a4b1f66099d711ce0ceef7ee5b656fb49828c0e83d1c695f94a4d3f066efe59f011a39aa6698b45f61d"' :
                                        'id="xs-injectables-links-module-BlogsModule-9bc463847c12180dc499a1831fb05f173dbaca64a7930a4b1f66099d711ce0ceef7ee5b656fb49828c0e83d1c695f94a4d3f066efe59f011a39aa6698b45f61d"' }>
                                        <li class="link">
                                            <a href="injectables/BlogsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlogsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BrandsModule.html" data-type="entity-link" >BrandsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BrandsModule-43d204a12e5291021829e285fa9422b87922430d0e1b7b6b102029b460480dee9dfc6f87756f028d886434892a577207d1ecaa43863a0f556126940b33f9eba0"' : 'data-bs-target="#xs-controllers-links-module-BrandsModule-43d204a12e5291021829e285fa9422b87922430d0e1b7b6b102029b460480dee9dfc6f87756f028d886434892a577207d1ecaa43863a0f556126940b33f9eba0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BrandsModule-43d204a12e5291021829e285fa9422b87922430d0e1b7b6b102029b460480dee9dfc6f87756f028d886434892a577207d1ecaa43863a0f556126940b33f9eba0"' :
                                            'id="xs-controllers-links-module-BrandsModule-43d204a12e5291021829e285fa9422b87922430d0e1b7b6b102029b460480dee9dfc6f87756f028d886434892a577207d1ecaa43863a0f556126940b33f9eba0"' }>
                                            <li class="link">
                                                <a href="controllers/BrandsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BrandsModule-43d204a12e5291021829e285fa9422b87922430d0e1b7b6b102029b460480dee9dfc6f87756f028d886434892a577207d1ecaa43863a0f556126940b33f9eba0"' : 'data-bs-target="#xs-injectables-links-module-BrandsModule-43d204a12e5291021829e285fa9422b87922430d0e1b7b6b102029b460480dee9dfc6f87756f028d886434892a577207d1ecaa43863a0f556126940b33f9eba0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BrandsModule-43d204a12e5291021829e285fa9422b87922430d0e1b7b6b102029b460480dee9dfc6f87756f028d886434892a577207d1ecaa43863a0f556126940b33f9eba0"' :
                                        'id="xs-injectables-links-module-BrandsModule-43d204a12e5291021829e285fa9422b87922430d0e1b7b6b102029b460480dee9dfc6f87756f028d886434892a577207d1ecaa43863a0f556126940b33f9eba0"' }>
                                        <li class="link">
                                            <a href="injectables/BrandsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CartsModule.html" data-type="entity-link" >CartsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CartsModule-291182b442ec9baee2880ee8c97cc53c8910961f2f2f6a99c6059006dc68541049ee044e320745bea2a01fcd98b3deeb05289d9e92e157c0447207b3d7bc6b31"' : 'data-bs-target="#xs-controllers-links-module-CartsModule-291182b442ec9baee2880ee8c97cc53c8910961f2f2f6a99c6059006dc68541049ee044e320745bea2a01fcd98b3deeb05289d9e92e157c0447207b3d7bc6b31"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CartsModule-291182b442ec9baee2880ee8c97cc53c8910961f2f2f6a99c6059006dc68541049ee044e320745bea2a01fcd98b3deeb05289d9e92e157c0447207b3d7bc6b31"' :
                                            'id="xs-controllers-links-module-CartsModule-291182b442ec9baee2880ee8c97cc53c8910961f2f2f6a99c6059006dc68541049ee044e320745bea2a01fcd98b3deeb05289d9e92e157c0447207b3d7bc6b31"' }>
                                            <li class="link">
                                                <a href="controllers/CartsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CartsModule-291182b442ec9baee2880ee8c97cc53c8910961f2f2f6a99c6059006dc68541049ee044e320745bea2a01fcd98b3deeb05289d9e92e157c0447207b3d7bc6b31"' : 'data-bs-target="#xs-injectables-links-module-CartsModule-291182b442ec9baee2880ee8c97cc53c8910961f2f2f6a99c6059006dc68541049ee044e320745bea2a01fcd98b3deeb05289d9e92e157c0447207b3d7bc6b31"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CartsModule-291182b442ec9baee2880ee8c97cc53c8910961f2f2f6a99c6059006dc68541049ee044e320745bea2a01fcd98b3deeb05289d9e92e157c0447207b3d7bc6b31"' :
                                        'id="xs-injectables-links-module-CartsModule-291182b442ec9baee2880ee8c97cc53c8910961f2f2f6a99c6059006dc68541049ee044e320745bea2a01fcd98b3deeb05289d9e92e157c0447207b3d7bc6b31"' }>
                                        <li class="link">
                                            <a href="injectables/CartsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoriesModule.html" data-type="entity-link" >CategoriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoriesModule-2d49b7a2a715bf174555a847e6b1e97c5f4a07f7c6d7d00a02a9375945fcc8ee7376062f24a9b48fffb3e088ac007e0453b051c7a8a79e635363aff20e9d5b44"' : 'data-bs-target="#xs-controllers-links-module-CategoriesModule-2d49b7a2a715bf174555a847e6b1e97c5f4a07f7c6d7d00a02a9375945fcc8ee7376062f24a9b48fffb3e088ac007e0453b051c7a8a79e635363aff20e9d5b44"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoriesModule-2d49b7a2a715bf174555a847e6b1e97c5f4a07f7c6d7d00a02a9375945fcc8ee7376062f24a9b48fffb3e088ac007e0453b051c7a8a79e635363aff20e9d5b44"' :
                                            'id="xs-controllers-links-module-CategoriesModule-2d49b7a2a715bf174555a847e6b1e97c5f4a07f7c6d7d00a02a9375945fcc8ee7376062f24a9b48fffb3e088ac007e0453b051c7a8a79e635363aff20e9d5b44"' }>
                                            <li class="link">
                                                <a href="controllers/CategoriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoriesModule-2d49b7a2a715bf174555a847e6b1e97c5f4a07f7c6d7d00a02a9375945fcc8ee7376062f24a9b48fffb3e088ac007e0453b051c7a8a79e635363aff20e9d5b44"' : 'data-bs-target="#xs-injectables-links-module-CategoriesModule-2d49b7a2a715bf174555a847e6b1e97c5f4a07f7c6d7d00a02a9375945fcc8ee7376062f24a9b48fffb3e088ac007e0453b051c7a8a79e635363aff20e9d5b44"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoriesModule-2d49b7a2a715bf174555a847e6b1e97c5f4a07f7c6d7d00a02a9375945fcc8ee7376062f24a9b48fffb3e088ac007e0453b051c7a8a79e635363aff20e9d5b44"' :
                                        'id="xs-injectables-links-module-CategoriesModule-2d49b7a2a715bf174555a847e6b1e97c5f4a07f7c6d7d00a02a9375945fcc8ee7376062f24a9b48fffb3e088ac007e0453b051c7a8a79e635363aff20e9d5b44"' }>
                                        <li class="link">
                                            <a href="injectables/CategoriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CloudinaryModule.html" data-type="entity-link" >CloudinaryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CloudinaryModule-789b7b3ff30e53e018f82747663a6445606c2f49de408f97fda773a07bfeb134239e84a1c928702776f3192702175c9223b2f39a31b0a669ba43c29be7ac2366"' : 'data-bs-target="#xs-injectables-links-module-CloudinaryModule-789b7b3ff30e53e018f82747663a6445606c2f49de408f97fda773a07bfeb134239e84a1c928702776f3192702175c9223b2f39a31b0a669ba43c29be7ac2366"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CloudinaryModule-789b7b3ff30e53e018f82747663a6445606c2f49de408f97fda773a07bfeb134239e84a1c928702776f3192702175c9223b2f39a31b0a669ba43c29be7ac2366"' :
                                        'id="xs-injectables-links-module-CloudinaryModule-789b7b3ff30e53e018f82747663a6445606c2f49de408f97fda773a07bfeb134239e84a1c928702776f3192702175c9223b2f39a31b0a669ba43c29be7ac2366"' }>
                                        <li class="link">
                                            <a href="injectables/CloudinaryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudinaryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColorsModule.html" data-type="entity-link" >ColorsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ColorsModule-bc57f951c7b2bb4f6004a3afe970b52a18af211b0d2cb73e354149684a2b4b640c85567ea6513dff4485ff923c627f18d8ac8c3b32df63334994b5ecb830eb88"' : 'data-bs-target="#xs-controllers-links-module-ColorsModule-bc57f951c7b2bb4f6004a3afe970b52a18af211b0d2cb73e354149684a2b4b640c85567ea6513dff4485ff923c627f18d8ac8c3b32df63334994b5ecb830eb88"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ColorsModule-bc57f951c7b2bb4f6004a3afe970b52a18af211b0d2cb73e354149684a2b4b640c85567ea6513dff4485ff923c627f18d8ac8c3b32df63334994b5ecb830eb88"' :
                                            'id="xs-controllers-links-module-ColorsModule-bc57f951c7b2bb4f6004a3afe970b52a18af211b0d2cb73e354149684a2b4b640c85567ea6513dff4485ff923c627f18d8ac8c3b32df63334994b5ecb830eb88"' }>
                                            <li class="link">
                                                <a href="controllers/ColorsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ColorsModule-bc57f951c7b2bb4f6004a3afe970b52a18af211b0d2cb73e354149684a2b4b640c85567ea6513dff4485ff923c627f18d8ac8c3b32df63334994b5ecb830eb88"' : 'data-bs-target="#xs-injectables-links-module-ColorsModule-bc57f951c7b2bb4f6004a3afe970b52a18af211b0d2cb73e354149684a2b4b640c85567ea6513dff4485ff923c627f18d8ac8c3b32df63334994b5ecb830eb88"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ColorsModule-bc57f951c7b2bb4f6004a3afe970b52a18af211b0d2cb73e354149684a2b4b640c85567ea6513dff4485ff923c627f18d8ac8c3b32df63334994b5ecb830eb88"' :
                                        'id="xs-injectables-links-module-ColorsModule-bc57f951c7b2bb4f6004a3afe970b52a18af211b0d2cb73e354149684a2b4b640c85567ea6513dff4485ff923c627f18d8ac8c3b32df63334994b5ecb830eb88"' }>
                                        <li class="link">
                                            <a href="injectables/ColorsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComparesModule.html" data-type="entity-link" >ComparesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ComparesModule-f397319fdee9dc8e6f842bd546e2bce9d77d659f7e2eb3997f8933587b0e329202e2a831c2edd4410d1b7a7c2e3bdd28ea75856ef6313674acce7d2b35442dba"' : 'data-bs-target="#xs-controllers-links-module-ComparesModule-f397319fdee9dc8e6f842bd546e2bce9d77d659f7e2eb3997f8933587b0e329202e2a831c2edd4410d1b7a7c2e3bdd28ea75856ef6313674acce7d2b35442dba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ComparesModule-f397319fdee9dc8e6f842bd546e2bce9d77d659f7e2eb3997f8933587b0e329202e2a831c2edd4410d1b7a7c2e3bdd28ea75856ef6313674acce7d2b35442dba"' :
                                            'id="xs-controllers-links-module-ComparesModule-f397319fdee9dc8e6f842bd546e2bce9d77d659f7e2eb3997f8933587b0e329202e2a831c2edd4410d1b7a7c2e3bdd28ea75856ef6313674acce7d2b35442dba"' }>
                                            <li class="link">
                                                <a href="controllers/ComparesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComparesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ComparesModule-f397319fdee9dc8e6f842bd546e2bce9d77d659f7e2eb3997f8933587b0e329202e2a831c2edd4410d1b7a7c2e3bdd28ea75856ef6313674acce7d2b35442dba"' : 'data-bs-target="#xs-injectables-links-module-ComparesModule-f397319fdee9dc8e6f842bd546e2bce9d77d659f7e2eb3997f8933587b0e329202e2a831c2edd4410d1b7a7c2e3bdd28ea75856ef6313674acce7d2b35442dba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ComparesModule-f397319fdee9dc8e6f842bd546e2bce9d77d659f7e2eb3997f8933587b0e329202e2a831c2edd4410d1b7a7c2e3bdd28ea75856ef6313674acce7d2b35442dba"' :
                                        'id="xs-injectables-links-module-ComparesModule-f397319fdee9dc8e6f842bd546e2bce9d77d659f7e2eb3997f8933587b0e329202e2a831c2edd4410d1b7a7c2e3bdd28ea75856ef6313674acce7d2b35442dba"' }>
                                        <li class="link">
                                            <a href="injectables/ComparesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComparesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CouponsModule.html" data-type="entity-link" >CouponsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CouponsModule-6c3550727b664f1df72d38eadcd8ec9cdcb875b4a667448fb004ab47994e62d97a465702ee9862b442e71f085bae3043c258d7ac58395bb97cba80cfd712282d"' : 'data-bs-target="#xs-controllers-links-module-CouponsModule-6c3550727b664f1df72d38eadcd8ec9cdcb875b4a667448fb004ab47994e62d97a465702ee9862b442e71f085bae3043c258d7ac58395bb97cba80cfd712282d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CouponsModule-6c3550727b664f1df72d38eadcd8ec9cdcb875b4a667448fb004ab47994e62d97a465702ee9862b442e71f085bae3043c258d7ac58395bb97cba80cfd712282d"' :
                                            'id="xs-controllers-links-module-CouponsModule-6c3550727b664f1df72d38eadcd8ec9cdcb875b4a667448fb004ab47994e62d97a465702ee9862b442e71f085bae3043c258d7ac58395bb97cba80cfd712282d"' }>
                                            <li class="link">
                                                <a href="controllers/CouponsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CouponsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CouponsModule-6c3550727b664f1df72d38eadcd8ec9cdcb875b4a667448fb004ab47994e62d97a465702ee9862b442e71f085bae3043c258d7ac58395bb97cba80cfd712282d"' : 'data-bs-target="#xs-injectables-links-module-CouponsModule-6c3550727b664f1df72d38eadcd8ec9cdcb875b4a667448fb004ab47994e62d97a465702ee9862b442e71f085bae3043c258d7ac58395bb97cba80cfd712282d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CouponsModule-6c3550727b664f1df72d38eadcd8ec9cdcb875b4a667448fb004ab47994e62d97a465702ee9862b442e71f085bae3043c258d7ac58395bb97cba80cfd712282d"' :
                                        'id="xs-injectables-links-module-CouponsModule-6c3550727b664f1df72d38eadcd8ec9cdcb875b4a667448fb004ab47994e62d97a465702ee9862b442e71f085bae3043c258d7ac58395bb97cba80cfd712282d"' }>
                                        <li class="link">
                                            <a href="injectables/CouponsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CouponsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EnquiriesModule.html" data-type="entity-link" >EnquiriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EnquiriesModule-dde7055a02bce29708affcff302bbbbef915b5d50f7a6b0fbdcab80266bd950436e16d85859e781b8ca20930bde1c9d4998348ad6f2fccd7e21f3a4c3de49b9b"' : 'data-bs-target="#xs-controllers-links-module-EnquiriesModule-dde7055a02bce29708affcff302bbbbef915b5d50f7a6b0fbdcab80266bd950436e16d85859e781b8ca20930bde1c9d4998348ad6f2fccd7e21f3a4c3de49b9b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EnquiriesModule-dde7055a02bce29708affcff302bbbbef915b5d50f7a6b0fbdcab80266bd950436e16d85859e781b8ca20930bde1c9d4998348ad6f2fccd7e21f3a4c3de49b9b"' :
                                            'id="xs-controllers-links-module-EnquiriesModule-dde7055a02bce29708affcff302bbbbef915b5d50f7a6b0fbdcab80266bd950436e16d85859e781b8ca20930bde1c9d4998348ad6f2fccd7e21f3a4c3de49b9b"' }>
                                            <li class="link">
                                                <a href="controllers/EnquiriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnquiriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EnquiriesModule-dde7055a02bce29708affcff302bbbbef915b5d50f7a6b0fbdcab80266bd950436e16d85859e781b8ca20930bde1c9d4998348ad6f2fccd7e21f3a4c3de49b9b"' : 'data-bs-target="#xs-injectables-links-module-EnquiriesModule-dde7055a02bce29708affcff302bbbbef915b5d50f7a6b0fbdcab80266bd950436e16d85859e781b8ca20930bde1c9d4998348ad6f2fccd7e21f3a4c3de49b9b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EnquiriesModule-dde7055a02bce29708affcff302bbbbef915b5d50f7a6b0fbdcab80266bd950436e16d85859e781b8ca20930bde1c9d4998348ad6f2fccd7e21f3a4c3de49b9b"' :
                                        'id="xs-injectables-links-module-EnquiriesModule-dde7055a02bce29708affcff302bbbbef915b5d50f7a6b0fbdcab80266bd950436e16d85859e781b8ca20930bde1c9d4998348ad6f2fccd7e21f3a4c3de49b9b"' }>
                                        <li class="link">
                                            <a href="injectables/EnquiriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EnquiriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailerModule.html" data-type="entity-link" >MailerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailerModule-f86e5dba06c298e6c15213a15cd875e78e193cb0e9797fb18afbc96a9d42dafa8768e8c5fb01c2e39f1a6553644847987548f5762262c056a5d4f4505dfdaa06"' : 'data-bs-target="#xs-injectables-links-module-MailerModule-f86e5dba06c298e6c15213a15cd875e78e193cb0e9797fb18afbc96a9d42dafa8768e8c5fb01c2e39f1a6553644847987548f5762262c056a5d4f4505dfdaa06"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailerModule-f86e5dba06c298e6c15213a15cd875e78e193cb0e9797fb18afbc96a9d42dafa8768e8c5fb01c2e39f1a6553644847987548f5762262c056a5d4f4505dfdaa06"' :
                                        'id="xs-injectables-links-module-MailerModule-f86e5dba06c298e6c15213a15cd875e78e193cb0e9797fb18afbc96a9d42dafa8768e8c5fb01c2e39f1a6553644847987548f5762262c056a5d4f4505dfdaa06"' }>
                                        <li class="link">
                                            <a href="injectables/MailerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrdersModule-f1a5412c72632fb2563aef0830e2c549f18ed20105c5d68d0ec28e51451bf2ac0794646fc451475dc684f3273f9f9a4196d2918da84cbf93e34fc87dcfa7e02a"' : 'data-bs-target="#xs-controllers-links-module-OrdersModule-f1a5412c72632fb2563aef0830e2c549f18ed20105c5d68d0ec28e51451bf2ac0794646fc451475dc684f3273f9f9a4196d2918da84cbf93e34fc87dcfa7e02a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-f1a5412c72632fb2563aef0830e2c549f18ed20105c5d68d0ec28e51451bf2ac0794646fc451475dc684f3273f9f9a4196d2918da84cbf93e34fc87dcfa7e02a"' :
                                            'id="xs-controllers-links-module-OrdersModule-f1a5412c72632fb2563aef0830e2c549f18ed20105c5d68d0ec28e51451bf2ac0794646fc451475dc684f3273f9f9a4196d2918da84cbf93e34fc87dcfa7e02a"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrdersModule-f1a5412c72632fb2563aef0830e2c549f18ed20105c5d68d0ec28e51451bf2ac0794646fc451475dc684f3273f9f9a4196d2918da84cbf93e34fc87dcfa7e02a"' : 'data-bs-target="#xs-injectables-links-module-OrdersModule-f1a5412c72632fb2563aef0830e2c549f18ed20105c5d68d0ec28e51451bf2ac0794646fc451475dc684f3273f9f9a4196d2918da84cbf93e34fc87dcfa7e02a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-f1a5412c72632fb2563aef0830e2c549f18ed20105c5d68d0ec28e51451bf2ac0794646fc451475dc684f3273f9f9a4196d2918da84cbf93e34fc87dcfa7e02a"' :
                                        'id="xs-injectables-links-module-OrdersModule-f1a5412c72632fb2563aef0830e2c549f18ed20105c5d68d0ec28e51451bf2ac0794646fc451475dc684f3273f9f9a4196d2918da84cbf93e34fc87dcfa7e02a"' }>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' :
                                        'id="xs-injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-a01518526b84e541979a3c4cab65c7f9f3986a597a74725d6f1ef5dca1d3ad2714a0ff575e9be8d74b3761e76d685bde126c7a74f6c3d8d3ec37e6539e6c4040"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-a01518526b84e541979a3c4cab65c7f9f3986a597a74725d6f1ef5dca1d3ad2714a0ff575e9be8d74b3761e76d685bde126c7a74f6c3d8d3ec37e6539e6c4040"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-a01518526b84e541979a3c4cab65c7f9f3986a597a74725d6f1ef5dca1d3ad2714a0ff575e9be8d74b3761e76d685bde126c7a74f6c3d8d3ec37e6539e6c4040"' :
                                            'id="xs-controllers-links-module-ProductsModule-a01518526b84e541979a3c4cab65c7f9f3986a597a74725d6f1ef5dca1d3ad2714a0ff575e9be8d74b3761e76d685bde126c7a74f6c3d8d3ec37e6539e6c4040"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-a01518526b84e541979a3c4cab65c7f9f3986a597a74725d6f1ef5dca1d3ad2714a0ff575e9be8d74b3761e76d685bde126c7a74f6c3d8d3ec37e6539e6c4040"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-a01518526b84e541979a3c4cab65c7f9f3986a597a74725d6f1ef5dca1d3ad2714a0ff575e9be8d74b3761e76d685bde126c7a74f6c3d8d3ec37e6539e6c4040"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-a01518526b84e541979a3c4cab65c7f9f3986a597a74725d6f1ef5dca1d3ad2714a0ff575e9be8d74b3761e76d685bde126c7a74f6c3d8d3ec37e6539e6c4040"' :
                                        'id="xs-injectables-links-module-ProductsModule-a01518526b84e541979a3c4cab65c7f9f3986a597a74725d6f1ef5dca1d3ad2714a0ff575e9be8d74b3761e76d685bde126c7a74f6c3d8d3ec37e6539e6c4040"' }>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewsModule.html" data-type="entity-link" >ReviewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReviewsModule-9ce6cbd19ee842524e88ffd724aff7827624e00ef4c3e0ba036f39a209b6daaef91cf4d15fd3e17859ffa3349c65047bf5c8b03698b9434990d03dae609d5daa"' : 'data-bs-target="#xs-controllers-links-module-ReviewsModule-9ce6cbd19ee842524e88ffd724aff7827624e00ef4c3e0ba036f39a209b6daaef91cf4d15fd3e17859ffa3349c65047bf5c8b03698b9434990d03dae609d5daa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewsModule-9ce6cbd19ee842524e88ffd724aff7827624e00ef4c3e0ba036f39a209b6daaef91cf4d15fd3e17859ffa3349c65047bf5c8b03698b9434990d03dae609d5daa"' :
                                            'id="xs-controllers-links-module-ReviewsModule-9ce6cbd19ee842524e88ffd724aff7827624e00ef4c3e0ba036f39a209b6daaef91cf4d15fd3e17859ffa3349c65047bf5c8b03698b9434990d03dae609d5daa"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReviewsModule-9ce6cbd19ee842524e88ffd724aff7827624e00ef4c3e0ba036f39a209b6daaef91cf4d15fd3e17859ffa3349c65047bf5c8b03698b9434990d03dae609d5daa"' : 'data-bs-target="#xs-injectables-links-module-ReviewsModule-9ce6cbd19ee842524e88ffd724aff7827624e00ef4c3e0ba036f39a209b6daaef91cf4d15fd3e17859ffa3349c65047bf5c8b03698b9434990d03dae609d5daa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewsModule-9ce6cbd19ee842524e88ffd724aff7827624e00ef4c3e0ba036f39a209b6daaef91cf4d15fd3e17859ffa3349c65047bf5c8b03698b9434990d03dae609d5daa"' :
                                        'id="xs-injectables-links-module-ReviewsModule-9ce6cbd19ee842524e88ffd724aff7827624e00ef4c3e0ba036f39a209b6daaef91cf4d15fd3e17859ffa3349c65047bf5c8b03698b9434990d03dae609d5daa"' }>
                                        <li class="link">
                                            <a href="injectables/ReviewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-bb53dba1fb7a771bf90ff35cf89516d8cc98f54efeba573cb211d3a4fb95f5205daf453a6f06913e81842273519948f7856924e3199ead8f36e6364d75ece3af"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-bb53dba1fb7a771bf90ff35cf89516d8cc98f54efeba573cb211d3a4fb95f5205daf453a6f06913e81842273519948f7856924e3199ead8f36e6364d75ece3af"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-bb53dba1fb7a771bf90ff35cf89516d8cc98f54efeba573cb211d3a4fb95f5205daf453a6f06913e81842273519948f7856924e3199ead8f36e6364d75ece3af"' :
                                            'id="xs-controllers-links-module-TagsModule-bb53dba1fb7a771bf90ff35cf89516d8cc98f54efeba573cb211d3a4fb95f5205daf453a6f06913e81842273519948f7856924e3199ead8f36e6364d75ece3af"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-bb53dba1fb7a771bf90ff35cf89516d8cc98f54efeba573cb211d3a4fb95f5205daf453a6f06913e81842273519948f7856924e3199ead8f36e6364d75ece3af"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-bb53dba1fb7a771bf90ff35cf89516d8cc98f54efeba573cb211d3a4fb95f5205daf453a6f06913e81842273519948f7856924e3199ead8f36e6364d75ece3af"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-bb53dba1fb7a771bf90ff35cf89516d8cc98f54efeba573cb211d3a4fb95f5205daf453a6f06913e81842273519948f7856924e3199ead8f36e6364d75ece3af"' :
                                        'id="xs-injectables-links-module-TagsModule-bb53dba1fb7a771bf90ff35cf89516d8cc98f54efeba573cb211d3a4fb95f5205daf453a6f06913e81842273519948f7856924e3199ead8f36e6364d75ece3af"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' :
                                            'id="xs-controllers-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' :
                                        'id="xs-injectables-links-module-UsersModule-132c7f85ae6ccdeb6ceff7eb57618efefa434019cf8359d899b6ca6bd1523189156587aa188349e5172f4dd748da7b840285715dca70ffa91094224737cec0e9"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WishlistsModule.html" data-type="entity-link" >WishlistsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WishlistsModule-938da17abfbb6eb88b35625dcb389902b03ea184019da4905b4f9c7cd26e35ac475a2956242786ef1d45388a2c7438fe6ff3795a31abd50535a599359093b5eb"' : 'data-bs-target="#xs-controllers-links-module-WishlistsModule-938da17abfbb6eb88b35625dcb389902b03ea184019da4905b4f9c7cd26e35ac475a2956242786ef1d45388a2c7438fe6ff3795a31abd50535a599359093b5eb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WishlistsModule-938da17abfbb6eb88b35625dcb389902b03ea184019da4905b4f9c7cd26e35ac475a2956242786ef1d45388a2c7438fe6ff3795a31abd50535a599359093b5eb"' :
                                            'id="xs-controllers-links-module-WishlistsModule-938da17abfbb6eb88b35625dcb389902b03ea184019da4905b4f9c7cd26e35ac475a2956242786ef1d45388a2c7438fe6ff3795a31abd50535a599359093b5eb"' }>
                                            <li class="link">
                                                <a href="controllers/WishlistsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WishlistsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WishlistsModule-938da17abfbb6eb88b35625dcb389902b03ea184019da4905b4f9c7cd26e35ac475a2956242786ef1d45388a2c7438fe6ff3795a31abd50535a599359093b5eb"' : 'data-bs-target="#xs-injectables-links-module-WishlistsModule-938da17abfbb6eb88b35625dcb389902b03ea184019da4905b4f9c7cd26e35ac475a2956242786ef1d45388a2c7438fe6ff3795a31abd50535a599359093b5eb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WishlistsModule-938da17abfbb6eb88b35625dcb389902b03ea184019da4905b4f9c7cd26e35ac475a2956242786ef1d45388a2c7438fe6ff3795a31abd50535a599359093b5eb"' :
                                        'id="xs-injectables-links-module-WishlistsModule-938da17abfbb6eb88b35625dcb389902b03ea184019da4905b4f9c7cd26e35ac475a2956242786ef1d45388a2c7438fe6ff3795a31abd50535a599359093b5eb"' }>
                                        <li class="link">
                                            <a href="injectables/WishlistsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WishlistsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BlogCategoriesController.html" data-type="entity-link" >BlogCategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BlogsController.html" data-type="entity-link" >BlogsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BrandsController.html" data-type="entity-link" >BrandsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CartsController.html" data-type="entity-link" >CartsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoriesController.html" data-type="entity-link" >CategoriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ColorsController.html" data-type="entity-link" >ColorsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ComparesController.html" data-type="entity-link" >ComparesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CouponsController.html" data-type="entity-link" >CouponsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EnquiriesController.html" data-type="entity-link" >EnquiriesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OrdersController.html" data-type="entity-link" >OrdersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductsController.html" data-type="entity-link" >ProductsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReviewsController.html" data-type="entity-link" >ReviewsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TagsController.html" data-type="entity-link" >TagsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/WishlistsController.html" data-type="entity-link" >WishlistsController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BlogQueryDto.html" data-type="entity-link" >BlogQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAddressDto.html" data-type="entity-link" >CreateAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBlogCategoryDto.html" data-type="entity-link" >CreateBlogCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBlogDto.html" data-type="entity-link" >CreateBlogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBrandDto.html" data-type="entity-link" >CreateBrandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCartDto.html" data-type="entity-link" >CreateCartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateColorDto.html" data-type="entity-link" >CreateColorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompareDto.html" data-type="entity-link" >CreateCompareDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCouponDto.html" data-type="entity-link" >CreateCouponDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEnquiryDto.html" data-type="entity-link" >CreateEnquiryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDto.html" data-type="entity-link" >CreateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateWishlistDto.html" data-type="entity-link" >CreateWishlistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteCartProductDto.html" data-type="entity-link" >DeleteCartProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductCompareDto.html" data-type="entity-link" >DeleteProductCompareDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProductWishlistDto.html" data-type="entity-link" >DeleteProductWishlistDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgotPasswordDto.html" data-type="entity-link" >ForgotPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetReviewDto.html" data-type="entity-link" >GetReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderCouponDto.html" data-type="entity-link" >OrderCouponDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaFilter.html" data-type="entity-link" >PrismaFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SigninDto.html" data-type="entity-link" >SigninDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignupDto.html" data-type="entity-link" >SignupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagColorsDto.html" data-type="entity-link" >TagColorsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAddressDto.html" data-type="entity-link" >UpdateAddressDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBlogCategoryDto.html" data-type="entity-link" >UpdateBlogCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBlogDto.html" data-type="entity-link" >UpdateBlogDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBrandDto.html" data-type="entity-link" >UpdateBrandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCartDto.html" data-type="entity-link" >UpdateCartDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateColorDto.html" data-type="entity-link" >UpdateColorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompareDto.html" data-type="entity-link" >UpdateCompareDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCouponDto.html" data-type="entity-link" >UpdateCouponDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEnquiryDto.html" data-type="entity-link" >UpdateEnquiryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReviewDto.html" data-type="entity-link" >UpdateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTagDto.html" data-type="entity-link" >UpdateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateWishlistDto.html" data-type="entity-link" >UpdateWishlistDto</a>
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
                                    <a href="injectables/AtStrategy.html" data-type="entity-link" >AtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BlogCategoriesService.html" data-type="entity-link" >BlogCategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BlogsService.html" data-type="entity-link" >BlogsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BrandsService.html" data-type="entity-link" >BrandsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartsService.html" data-type="entity-link" >CartsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoriesService.html" data-type="entity-link" >CategoriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CloudinaryService.html" data-type="entity-link" >CloudinaryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ColorsService.html" data-type="entity-link" >ColorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComparesService.html" data-type="entity-link" >ComparesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CouponsService.html" data-type="entity-link" >CouponsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EnquiriesService.html" data-type="entity-link" >EnquiriesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailerService.html" data-type="entity-link" >MailerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrdersService.html" data-type="entity-link" >OrdersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsInterceptor.html" data-type="entity-link" >ProductsInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductsService.html" data-type="entity-link" >ProductsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshGuard.html" data-type="entity-link" >RefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReviewsService.html" data-type="entity-link" >ReviewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RtStrategy.html" data-type="entity-link" >RtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagsService.html" data-type="entity-link" >TagsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WishlistsService.html" data-type="entity-link" >WishlistsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
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
                                <a href="interfaces/IBlogFilters.html" data-type="entity-link" >IBlogFilters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICommonRes.html" data-type="entity-link" >ICommonRes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomOrderItem.html" data-type="entity-link" >ICustomOrderItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJwtPayload.html" data-type="entity-link" >IJwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMailerOptions.html" data-type="entity-link" >IMailerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMailerOpts.html" data-type="entity-link" >IMailerOpts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOrderFilters.html" data-type="entity-link" >IOrderFilters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProductFilters.html" data-type="entity-link" >IProductFilters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserFilters.html" data-type="entity-link" >IUserFilters</a>
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