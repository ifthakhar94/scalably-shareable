import { gql } from 'apollo-boost';
export const getHubListQuery = gql`
  query ($pageNumber: Int) {
    hubLists(
      searchWord: "" # optional
      pageNumber: $pageNumber # optional
      perPage: 7 # optional
    ) {
      message
      hublist {
        hubId
        hubicon
        hubname
        huburl
        publish_status # GENERAL_PUBLIC/LIMITED_PUBLIC
        hubmembernum # 1st release 1 static
        connectassetnum
        categories
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const getHubDetailQuery = gql`
  query ($hubId: ID) {
    getHubDetailInfo(hubId: $hubId) {
      message
      hubdetail {
        hubId
        hubicon
        hubname
        huburl
        ownerEcomediaId
        publish_status # GENERAL_PUBLIC/LIMITED_PUBLIC
        hubmembernum # 1st release 1 static
        connectassetnum
        outputrssnum
        categories
      }
    }
  }
`;
export const updateHubInfo = gql`
  mutation ($hubId: ID!, $hubName: String!, $hubCategory: [String!]!) {
    updateHubInfo(
      hubId: $hubId
      hubName: $hubName
      hubCategory: $hubCategory
      publicScope: GENERAL_PUBLIC # GENERAL_PUBLIC/LIMITED_PUBLIC
    ) {
      message
    }
  }
`;

export const singleHubInfo = gql`
  query ($hubId: ID!) {
    getHubDetailInfo(hubId: $hubId) {
      message
      hubdetail {
        hubicon
        hubname
        ownerEcomediaId
        huburl
        publish_status # GENERAL_PUBLIC/LIMITED_PUBLIC
        hubmembernum # 1st release 1 static
        connectassetnum
        outputrssnum
        categories
      }
    }
  }
`;

export const checkLoginEmail = gql`
  mutation ($email: String!) {
    checkLoginEmail(email: $email) {
      message
    }
  }
`;
export const loginGql = gql`
  query ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      user {
        email
        email_verified
        is_registered
        purpose_setup
        role
        ecomedia_id
        token
        refreshToken
      }
    }
  }
`;
export const signupCheckEmail = gql`
  mutation ($email: String!, $resend: Boolean) {
    checkEmail(email: $email, resend: $resend) {
      message
    }
  }
`;

export const verifyEmail = gql`
  query VerifyEmail($email: String!, $otp: String!) {
    verifyEmail(email: $email, otp: $otp) {
      message
    }
  }
`;

export const CreateUser = gql`
  mutation CreateUser($email: String!, $password: String!, $confirmPassword: String!) {
    createUser(email: $email, password: $password, confirmPassword: $confirmPassword) {
      message
      user {
        email
        is_registered
        purpose_setup
        role
        ecomedia_id
        token
        refreshToken
      }
    }
  }
`;

export const SetBasicInfo = gql`
  mutation SetBasicInfo($purpose: String!, $purpose_detail: String!, $ecomedia_id: String!) {
    setBasicInfo(purpose: $purpose, purpose_detail: $purpose_detail, ecomedia_id: $ecomedia_id) {
      message
      user {
        email
        is_registered
        purpose_setup
        role
        ecomedia_id
        token
        refreshToken
      }
    }
  }
`;
export const forgetPassword = gql`
  query ($email: String!) {
    forgetPassword(email: $email) {
      message
    }
  }
`;

export const googleSocialLogin = gql`
  query ($token: String!) {
    socialLogin(token: $token) {
      message
      user {
        email
        is_registered
        purpose_setup
        role
        ecomedia_id
        token
      }
    }
  }
`;

export const PurposeList = gql`
  query {
    purposeList {
      key
      value
      items {
        key
        value
      }
    }
  }
`;

export const hubCategories = gql`
  query ($searchWord: String!) {
    hubCategories(searchWord: $searchWord) {
      message
      hubCategoryList {
        id
        name
      }
    }
  }
`;

export const resetPassword = gql`
  mutation ResetPassword($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      message
    }
  }
`;

export const hubIconUpdateQuery = gql`
  mutation updateHubIcon($hubId: ID!, $hubIcon: String!) {
    updateHubIcon(hubId: $hubId, hubIcon: $hubIcon) {
      message
      imageUrl
    }
  }
`;

export const additionalNewsAssetsearchResult = gql`
  query NewsAssetSearchingForConnection($hubId: ID!, $searchWord: String, $pageNumber: Int, $perPage: Int) {
    searchNewsAsset(hubId: $hubId, searchWord: $searchWord, pageNumber: $pageNumber, perPage: $perPage) {
      message
      newsAssetList {
        newsAssetId
        asseetIcon
        asseetName
        assetURL
        self_icon
        assetowner_id
        publish_status
        hubconnstatus {
          hubId
          status
        }
        categories {
          id
          name
        }
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const GetHubNewsAssetListQueryString = gql`
  query GetHubNewsAssetList($hubId: ID!, $searchWord: String, $pageNumber: Int, $perPage: Int) {
    getHubNewsAssetList(hubId: $hubId, searchWord: $searchWord, pageNumber: $pageNumber, perPage: $perPage) {
      message
      hubNewsAssetList {
        assetname
        newsAssetId
        asseticon
        asseturl
        self_icon
        ecomedia_id
        public_status
        assetcategories {
          id
          name
        }
        third_party_categories {
          id
          name
        }
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const newsAssetDisconnectQueryString = gql`
  mutation NewsAssetDisconnect($newsAssetId: ID!, $hubId: ID!) {
    newsAssetDisconnect(newsAssetId: $newsAssetId, hubId: $hubId) {
      message
    }
  }
`;

export const HubConnectNewsAsset = gql`
  mutation HubConnectNewsAsset($newsAssetId: ID!, $hubId: ID!) {
    connectNewsAsset(newsAssetId: $newsAssetId, hubId: $hubId) {
      message
    }
  }
`;

export const newsAssetsCatSetupQuery = gql`
  mutation NewsAssetCategorySetupByHubOwner($newsAssetId: ID!, $hubId: ID!, $categories: [String]) {
    newsAssetCategorySetupHubOwner(newsAssetId: $newsAssetId, hubId: $hubId, categories: $categories) {
      message
    }
  }
`;

export const createNewsAssetQuery = gql`
  mutation CeateNewsAsset(
    $name: String!
    $url: String!
    $description: String
    $public_status: String!
    $newsAssetCategory: [String]
    $rss: [RssInput]
  ) {
    createNewsAsset(
      name: $name
      url: $url
      description: $description
      public_status: $public_status # EVERYONE/APPROVAL_REQUIRED
      newsAssetCategory: $newsAssetCategory
      rss: $rss
    ) {
      message
      newsAssetId
    }
  }
`;

export const newsAssetListsData = gql`
  query getRegisteredNewsAssetList($searchWord: String, $pageNumber: Int, $perPage: Int) {
    getRegisteredNewsAssetList(searchWord: $searchWord, pageNumber: $pageNumber, perPage: $perPage) {
      message
      newsAssetList {
        newsAssetId
        newsAssetOwnerId
        newsAssetOwnerEcomediaId
        asseetIcon
        asseetName
        assetURL
        publish_status
        acquiredsourcediscordnum
        acquiredsourcetelegramnum
        acquiredsourcewebnum
        accesspointnum
        assetcategory {
          id
          name
        }
        thirdPartyCategory {
          id
          name
        }
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const newsAssetsDetailsQuery = gql`
  query getNewsAssetDetails($newsAssetId: ID!) {
    getNewsAssetDetails(newsAssetId: $newsAssetId) {
      message
      newsAssetDetails {
        newsAssetId
        newsAssetOwnerId
        newsAssetOwnerEcomediaId
        asseetIcon
        asseetName
        assetURL
        description
        publish_status
        engagementRate
        acquiredsourcediscordnum
        acquiredsourcetelegramnum
        acquiredsourcewebnum
        accesspointnum
        assetcategory {
          id
          name
        }
        thirdPartyCategory {
          id
          name
        }
        rss {
          id
          url
          sitename
          favicon
        }
      }
    }
  }
`;

export const hubListConnectedToNewsAssetsQuery = gql`
  query getHublistConnectedToNewsAsset($newsAssetId: ID!, $searchWord: String, $pageNumber: Int, $perPage: Int) {
    getHublistConnectedToNewsAsset(newsAssetId: $newsAssetId, searchWord: $searchWord, pageNumber: $pageNumber, perPage: $perPage) {
      message
      hubList {
        hubId
        hubIcon
        hubname
        owner_id
        hubconnstatus
        hubmembernum
        connectassetnum
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;
export const rssUrlUpdate = gql`
  mutation updateRss($newsAssetId: ID!, $rss: [RssInput]!) {
    updateRss(newsAssetId: $newsAssetId, rss: $rss) {
      message
    }
  }
`;

export const acceptNewsAssetsQuery = gql`
  mutation updateHubConnStatus($newsAssetId: ID!, $hubId: ID!, $status: String!) {
    updateHubConnStatus(newsAssetId: $newsAssetId, hubId: $hubId, status: $status) {
      message
    }
  }
`;

export const singleNewsAssetInfo = gql`
  query getNewsAssetDetails($newsAssetId: ID!) {
    getNewsAssetDetails(newsAssetId: $newsAssetId) {
      message
      newsAssetDetails {
        newsAssetId
        newsAssetOwnerId
        newsAssetOwnerEcomediaId
        asseetIcon
        asseetName
        assetURL
        description
        publish_status
        engagementRate
        acquiredsourcediscordnum
        acquiredsourcetelegramnum
        acquiredsourcewebnum
        accesspointnum
        assetcategory {
          id
          name
        }
        thirdPartyCategory {
          id
          name
        }
      }
    }
  }
`;

export const updateNewsAssetInfo = gql`
  mutation UpdateNewsAsset(
    $newsAssetId: ID!
    $name: String!
    $url: String!
    $description: String
    $public_status: String!
    $newsAssetCategory: [String]
  ) {
    updateNewsAsset(
      newsAssetId: $newsAssetId
      name: $name
      url: $url
      description: $description
      public_status: $public_status # EVERYONE/APPROVAL_REQUIRED
      newsAssetCategory: $newsAssetCategory
    ) {
      message
    }
  }
`;

export const DeleteNewsAssetQuery = gql`
  mutation DeleteNewsAsset($newsAssetId: ID!, $confirmText: String!) {
    deleteNewsAsset(newsAssetId: $newsAssetId, confirmText: $confirmText) {
      message
    }
  }
`;

export const newsAssetsIconUpdateQuery = gql`
  mutation updateNewsAssetIcon($newsAssetId: ID!, $newsAssetIcon: String!) {
    updateNewsAssetIcon(newsAssetId: $newsAssetId, newsAssetIcon: $newsAssetIcon) {
      message
    }
  }
`;

export const getTokenByRefreshTokenQuery = gql`
  query GetTokenByRefreshToken($refreshToken: String!) {
    getTokenByRefreshToken(refreshToken: $refreshToken) {
      token
    }
  }
`;

export const getUserByTokenQuery = gql`
  query GetUserByToken($token: String!, $refreshToken: String!) {
    getUserByToken(token: $token, refreshToken: $refreshToken) {
      message
      user {
        email
        is_registered
        purpose_setup
        role
        ecomedia_id
        token
        refreshToken
      }
    }
  }
`;

export const getMediaHubInfo = gql`
  query GetMediaTopCategoryList($ecomediaId: String!, $hubUrl: String!) {
    getMediaHubInfo(ecomediaId: $ecomediaId, hubUrl: $hubUrl) {
      message
      hubInfo {
        hubId
        hubIcon
      }
    }
  }
`;

export const getMediaTopCategoryList = gql`
  query GetMediaTopCategoryList($hubId: String!) {
    getMediaCategoryList(hubId: $hubId) {
      message
      categories {
        id
        name
      }
    }
  }
`;

export const getMediaArticleListQuery = gql`
  query GetMediaTopArticleList($hubId: String!, $pageNumber: Int, $perPage: Int) {
    getMediaArticleList(hubId: $hubId, pageNumber: $pageNumber, perPage: $perPage) {
      message
      articles {
        articleId
        title
        image
        sitename
        published_at
        content
        plain_content
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const GetMediaTopNewsAssetList = gql`
  query GetMediaTopNewsAssetList($hubId: String!, $pageNumber: Int, $perPage: Int) {
    getMediaNewsAssetList(hubId: $hubId, pageNumber: $pageNumber, perPage: $perPage) {
      message
      newsAssets {
        newsAssetId
        assetname
        asseticon
        categories {
          id
          name
        }
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const GetCategoryNewsAssetListQuery = gql`
  query GetMediaCategoryNewsAssetList($hubId: String!, $categoryId: String!, $pageNumber: Int, $perPage: Int) {
    getMediaCategoryNewsAssetList(hubId: $hubId, categoryId: $categoryId, pageNumber: $pageNumber, perPage: $perPage) {
      message
      newsAssets {
        newsAssetId
        assetname
        asseticon
        categories {
          id
          name
        }
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const GetMediaTopCategoryArticleListQuery = gql`
  query GetMediaTopCategoryArticleList($hubId: String!, $categoryId: String!, $pageNumber: Int, $perPage: Int) {
    getMediaCategoryArticleList(hubId: $hubId, categoryId: $categoryId, pageNumber: $pageNumber, perPage: $perPage) {
      message
      category {
        id
        name
      }
      articles {
        articleId
        title
        image
        sitename
        published_at
        content
        plain_content
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const getMediaArticleDetails = gql`
  query GetMediaTopArticleDetails($hubId: String!, $articleId: String!) {
    getMediaArticleDetails(hubId: $hubId, articleId: $articleId) {
      message
      article {
        articleId
        title
        image
        sitename
        article_category
        source_url
        published_at
        content
        plain_content
      }
    }
  }
`;

export const getMediaNewsAssetDetails = gql`
  query GetMediaNewsAssetInfo($hubId: String!, $newsAssetId: String!) {
    getMediaNewsAssetInfo(hubId: $hubId, newsAssetId: $newsAssetId) {
      message
      newsAsset {
        assetId
        assetname
        asseticon
        description
        last_article
        owner_icon
        owner_ecomedia_id
      }
    }
  }
`;

export const newsAssetsArticlesQuery = gql`
  query GetMediaTopNewsAssetArticleList($hubId: String!, $newsAssetId: String!, $pageNumber: Int, $perPage: Int) {
    getMediaNewsAssetArticleList(hubId: $hubId, newsAssetId: $newsAssetId, pageNumber: $pageNumber, perPage: $perPage) {
      message
      articles {
        articleId
        title
        image
        sitename
        published_at
        content
        plain_content
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const GetRssUrlToFetchSiteTitle = gql`
  query GetRssUrlToFetchSiteTitle($rssUrl: String!) {
    getRssUrlToTitle(rssUrl: $rssUrl) {
      message
      siteTitle
    }
  }
`;

export const GetRssCategoriesQuery = gql`
  query GetHubConnectedNewsAssetCategories($hubId: String!) {
    getHubConnectedNewsAssetCategoryList(hubId: $hubId) {
      message
      categories {
        id
        name
      }
    }
  }
`;

export const GetRssLanguageListQuery = gql`
  query TranslationSupportedLanguageList {
    getLanguageList {
      message
      languageList {
        id
        language_name
        language_code
        deepl_code
        status
      }
    }
  }
`;

export const GetRssSocialServiceListQuery = gql`
  query GetSocialServiceList($onlyActive: Boolean) {
    getSocialServiceList(onlyActive: $onlyActive) {
      socialServiceId
      name
      unique_identifier
      status
    }
  }
`;

export const CreatOutputRSSQuery = gql`
  mutation CreateOutputRss(
    $hubId: String!
    $categories: [String!]
    $socialServiceId: String!
    $languageTranslationId: String!
    $export_type: String!
    $use_case: String
  ) {
    createOutputRss(
      hubId: $hubId
      categories: $categories
      socialServiceId: $socialServiceId
      languageTranslationId: $languageTranslationId
      export_type: $export_type #  TITLE_ONLY / TITLE_AND_BODY
      use_case: $use_case
    ) {
      message
    }
  }
`;

export const GetHubOutputRssListQuery = gql`
  query GetHubOutputRssList($hubId: String!, $pageNumber: Int, $perPage: Int) {
    getOutputRssList(hubId: $hubId, pageNumber: $pageNumber, perPage: $perPage) {
      message
      outputRss {
        output_rss_id
        platform_icon
        platform
        rss_url
        description
        language_code
        export_type
      }
      pagination {
        currentPage
        totalPages
        totalItems
        fromData
        toData
      }
    }
  }
`;

export const DeletOutputRssListQuery = gql`
  mutation DeleteOutputRss($outputRssId: String!) {
    deleteOutputRss(outputRssId: $outputRssId) {
      message
    }
  }
`;

export const updateOutputRssQuery = gql`
  mutation UpdateOutputRssInformation(
    $outputRssId: String!
    $hubId: String!
    $categories: [String!]
    $socialServiceId: String!
    $languageTranslationId: String!
    $export_type: String!
    $use_case: String
  ) {
    updateOutputRss(
      outputRssId: $outputRssId
      hubId: $hubId
      categories: $categories
      socialServiceId: $socialServiceId
      languageTranslationId: $languageTranslationId
      export_type: $export_type #  TITLE_ONLY / TITLE_AND_BODY
      use_case: $use_case
    ) {
      message
    }
  }
`;

export const updateRssExistingDataQuery = gql`
  query GetOutputRssInfo($outputRssId: String!) {
    getOutputRssInfo(outputRssId: $outputRssId) {
      message
      outputRss {
        output_rss_id
        platform_icon
        platform_id
        rss_url
        description
        language_id
        categories {
          id
          name
        }
        export_type
      }
    }
  }
`;
