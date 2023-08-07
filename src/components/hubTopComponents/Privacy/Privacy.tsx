import Link from 'next/link';
import Styles from '../HubTopUI/HubTopUI.module.css';
import CommonLayout from '../commonLayout/CommonLayout';
import PrivacyDesign from './Privacy.module.css';

const Privacy = () => {
  return (
    <>
      <CommonLayout header_value="Privacy Policy">
        {/* BreadCrumb   */}
        <div className={Styles.section_breadcrumb}>
          <ul>
            <li>
              <Link href="#">プライバシーポリシー</Link>
            </li>
          </ul>
        </div>

        <section className={Styles.terms_section}>
          <div className={Styles.terms_title}>
            <h2> プライバシーポリシー</h2>
          </div>
          <div className={PrivacyDesign.totalDiv}>
            <div className={Styles.terms_container}>
              <div>
                <p className={PrivacyDesign.title12}>プライバシーノーティス</p>
                {/* main points orderList-------------------- */}
                <ol style={{ listStyleType: 'decimal' }} className={PrivacyDesign.mainPoints}>
                  {/* point 1------------------------------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>本ノーティスについて</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    Scalably株式会社（以下 <span className={PrivacyDesign.boldText}>「当社」</span>
                    といいます。）は、全ての適用法及び将来それらに取って代わる法に従い、お客様の個人データを処理します。本ノーティスでは、お客様の個人データの処理に関連する法に基づく情報を記載しています。本ノーティスに基づき、当社は、お客様が当社に提供する、又は他の情報源から当社が取得するあらゆる個人データを処理します。本ノーティスを必ずお読みになり、ご理解いただきますようお願いいたします。
                  </p>
                  <p className={PrivacyDesign.eachParaText}>
                    一部の個人データは、当社が発行するその他のプライバシーポリシーの対象となることがあります。この場合、当該プライバシーポリシーの定めが本ノーティスの定めと矛盾する場合には、本ノーティスが当該その他のプライバシーポリシーに優先します
                  </p>

                  {/* point2------------------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>定義</span>
                  </li>
                  <p style={{ marginLeft: '30px', marginBottom: '10px' }} className={PrivacyDesign.eachParaText}>
                    本ノーティスにおいて
                  </p>
                  <ol style={{ listStyleType: 'lower-alpha' }} className={PrivacyDesign.subPoints}>
                    <li>
                      <span style={{ marginLeft: '10px', marginBottom: '20px' }}>
                        お客様の <span className={PrivacyDesign.boldText}>「個人データ」</span>
                        とは、識別された又は識別可能な自然人（以下 <span className={PrivacyDesign.boldText}>「データ主体」</span>
                        といいます。）に関するあらゆる情報をいいます。
                      </span>
                    </li>
                    <li>
                      <span style={{ marginLeft: '10px', marginBottom: '20px' }}>
                        <span className={PrivacyDesign.boldText}>「処理」</span>
                        とは、自動的な手段によるか否かを問わず、収集、記録、編集、構成、記録保存、調整若しくは変更、検索、参照、使用、送信による開示、配布、又は、それら以外の方法で利用可能なものとすること、整列若しくは結合、制限、消去若しくは破壊のような、個人データ若しくは一連の個人データに実施される作業又は一連の作業をいいます。
                      </span>
                    </li>

                    <li>
                      <span style={{ marginLeft: '10px', marginBottom: '20px' }}>
                        <span className={PrivacyDesign.boldText}>「管理者」</span>
                        とは、自然人又は法人、公的機関、部局又はその他の組織であって、単独又は他の者と共同で個人データの処理の目的及び手段を決定する者をいいます。
                      </span>
                    </li>
                  </ol>

                  {/* point 3------------------------------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>当社が収集する個人データ及びお客様の個人データの収集方法</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    お客様が当社のウェブサイトをご覧になる、又は当社のサービスを利用される際、当社は、お客様が当社のウェブサイトにアクセスするにあたって使用する機器の技術情報及び当社のウェブサイト又はサービスとのお客様のやり取りについて、自動的に収集、保存及び/又は使用することがあります。この情報は、クッキーを通じてお客様の機器から当社に送信されます。当社によるクッキーの利用及び当該利用を停止する方法について、詳しくは当社のクッキーポリシーをご覧ください。
                  </p>
                  <p className={PrivacyDesign.eachParaText}>
                    当社は、お客様が当社のウェブサイト上で、電子メールを用いて、又は電話で当社にご連絡した際に、お客様に関する個人データを受領することがあり、当該個人データには、お客様の氏名、住所、電子メールアドレス、電話番号並びにお客様の連絡、お問い合わせ及び応答の詳細が含まれることがあります。
                  </p>
                  <p className={PrivacyDesign.eachParaText}>
                    当社は、お客様が当社のウェブサイトにお客様の情報を登録し、又は当社のサービスを使用する際に、お客様の電子メールアドレスを収集します。また、当社は、お客様がお客様の個人データを当社のウェブサイトに投稿し、又は当社のサービスを利用する過程で提供する場合に、お客様に関する個人データを取得することがあります。
                  </p>

                  {/* point 4------------------------------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>個人データの処理に係る法的根拠及び目的</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>当社は、以下の法的根拠に基づき、お客様の個人情報を処理します。</p>
                  <ol style={{ listStyleType: 'lower-alpha' }} className={PrivacyDesign.subPoints}>
                    <li>
                      <span className={PrivacyDesign.boldText}>法的義務　</span>当社が法的義務の遵守を義務づけられる場合を指します。
                    </li>
                    <li>
                      <span className={PrivacyDesign.boldText}>契約の履行　</span>
                      お客様が当事者である契約を履行するため又は契約締結前にお客様の要請に応じて一定の手段を講じるために、お客様の個人データを処理する必要がある場合を指します。
                    </li>
                    <li>
                      <span className={PrivacyDesign.boldText}>正当な利益　</span>
                      お客様の個人データの処理が、当社の事業の促進など、当社又は第三者が求める正当な利益に必要な場合であって、お客様の利益及び基本的権利がそれらの利益に優先しない場合を指します。
                    </li>
                    <li>
                      <span className={PrivacyDesign.boldText}>同意　</span>
                      当社がお客様の個人データを処理することについてお客様が同意した場合を指します。ただし、当社がお客様から当該同意を取得した場合であっても、当社はその他の法的根拠に基づいてお客様の個人データを処理することがあります。なお、お客様による同意の撤回（本ノーティスの下記第9項(g)をご覧ください。）は、その撤回前の同意に基づく、当社によるお客様の個人データの処理の適法性に影響を与えません。
                    </li>
                  </ol>
                  <p className={PrivacyDesign.eachParaText}>
                    当社は、お客様に関して保有する個人データを以下の目的を達成するために必要な範囲内に限って使用します。
                  </p>
                  <ol style={{ listStyleType: 'lower-alpha' }} className={PrivacyDesign.subPoints}>
                    <li>
                      お客様が当社のサービスを利用する際にサービス利用者としてお客様を識別すること（契約の履行又は正当な利益に基づきます。）
                    </li>
                    <li>
                      お客様の質問、お問い合わせ、又はメッセージへの対応を含む、お客様とのやり取り（お客様の同意又は正当な利益に基づきます。）
                    </li>
                    <li>
                      当社のウェブサイト及びサービスを通して取得したデータの分析並びに当社のウェブサイト及びサービスの改善（お客様の同意又は正当な利益に基づきます。）
                    </li>
                    <li>
                      当社のサービスに関してお客様へのダイレクトメールの送信を含む、営業活動（お客様の同意又は正当な利益に基づきます。）
                    </li>
                    <li>当社に適用されるあらゆる法令の遵守（法的義務に基づきます。）</li>
                    <li>
                      管轄権を有するデータ保護当局及び行政調査又は犯罪調査に携わる機関を含む、関連する政府当局及び部局との協力（法的義務又は正当な利益に基づきます。）
                    </li>
                  </ol>
                  <p className={PrivacyDesign.eachParaText}>
                    当社は、お客様の <span className={PrivacyDesign.boldText}>「センシティブデータ」</span>
                    （すなわち、お客様の人種、種族的出身、宗教、身体的若しくは精神的健康、政治的意見、性的指向、実際の犯罪若しくは犯罪の疑い、又は遺伝子データ及び生体データに関する情報）の処理は行いません。
                  </p>

                  {/* point 5 ------------ */}
                  <li>
                    <span className={PrivacyDesign.listText}>受領者への個人データの開示</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>当社は、お客様の個人データを、以下の類型の受領者と共有することがあります。</p>
                  <ol style={{ listStyleType: 'lower-alpha' }} className={PrivacyDesign.subPoints}>
                    <li>
                      当社による内部利用：当社は、お客様の個人データを、当該データにアクセスする権限及び必要性を有する当社の従業員に共有することがあります。
                    </li>
                    <li>
                      関係会社：当社は、内部管理目的及び本ノーティスに適合する使用のために、当社の関係会社にお客様の個人データを共有することがあります。
                    </li>
                    <li>
                      サービス提供者：当社は、お客様の個人データを（データサーバーの提供などの）サービスを行う第三者のサービス提供者に共有することがあります。
                    </li>
                    <li>
                      法的手続及び安全性：当社は、適用法に従い、お客様の個人データを法的又は政府規制当局に開示することがあります。また、当社は、請求、紛争、若しくは訴訟に関連して又はそれ以外で適用法によりお客様の個人データを第三者に開示することが要求される場合に、当該開示がお客様若しくは他の者の健康及び安全を守るため、又は当社の法的権利を行使し、若しくはお客様が締結した契約責任を執行するために必要であると判断した場合、お客様の個人データを第三者に開示することがあります。
                    </li>
                    <li>
                      事業の譲渡：お客様の個人データは、合併、買収、会社分割、事業の譲渡、合弁事業、又は企業資産の資金調達若しくは販売などの企業取引の一環として開示されることがあり、当該取引内の企業資産の一つとして第三者に譲渡されることがあります。また、お客様の個人データは、支払不能、破産、又は財産保全管理の場合に開示されることがあります。
                    </li>
                  </ol>

                  {/* point 6------------ */}
                  <li>
                    <span className={PrivacyDesign.listText}>欧州経済領域域外及び英国国外への個人データの移転</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    当社が欧州経済領域内及び/又は英国国内のデータ主体に関して保有する個人データは、欧州経済領域域外及び/又は英国国外の第三者に対して移転され、かつ、当該第三者により保管されることがあります。当社が当該個人データを欧州経済領域域外及び/又は英国国外に移転する場合、以下の点を確保します。
                  </p>
                  <ol style={{ listStyleType: 'lower-alpha' }} className={PrivacyDesign.subPoints}>
                    <li>
                      移転先となる地域が、データ主体が自身の個人データについて有する権利及び自由に対して十分なレベルの保護を確保しているとする欧州委員会の認定を受けていること、及び/又は移転先となる地域が、2018年データ保護法に基づき、十分なレベルの保護を確保しているとする英国政府の指定を受けていること。又は、
                    </li>
                    <li>受領者が、欧州委員会及び/又は英国政府が承認した標準データ保護条項を当社と締結していること。</li>
                  </ol>
                  <p className={PrivacyDesign.eachParaText}>
                    第12項に記載する当社の連絡先に連絡することにより、個人データが欧州経済領域域外及び/又は英国国外に移転される場合に与えられる保護について更なる詳細を確認することができます。{' '}
                  </p>

                  {/* point 7----------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>個人データの保管期限</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    当社は、お客様の個人データを、当該個人データの処理のために必要な期間保持します。ただし、個人データをより長い期間保持することが適用法により要求されている場合はこの限りでなく、この場合には、当該個人データを適用法により要求される期間保持するものとします。クッキーに関する保管期限については、当社のクッキーポリシーをご覧ください。
                  </p>

                  {/* point 8----------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>安全管理措置</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    当社は、お客様の個人データの保護に注力し、お客様の個人データを、不注意若しくは不正による毀損、滅失、変更、開示又はアクセスから守るのに適切な水準のセキュリティを確保するために、十分な技術上及び組織上の措置を実施し、維持します。下記の第12項に記載する当社の連絡先に連絡することにより、当社の技術上及び組織上の措置について更なる詳細を確認することができます。
                  </p>
                  {/* point 9----------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>お客様の権利</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    お客様は、当社がお客様に関して保有する個人データについて、複数の法的権利を有しています。これらの権利は、お客様の所在地及びお客様と当社の関係に適用されるデータ保護法令に応じて変わり得るものですが、典型的には以下のものが含まれます。
                  </p>

                  <ol style={{ listStyleType: 'lower-alpha' }} className={PrivacyDesign.subPoints}>
                    <li>
                      お客様に係る個人データの処理に関する情報を取得する権利、及びお客様に関して当社が保有している個人データにアクセスする権利/又は移転先となる地域が、2018年データ保護法に基づき、十分なレベルの保護を確保しているとする英国政府の指定を受けていること。又は、
                    </li>
                    <li>お客様の個人データが不正確又は不完全である場合に、当社に対して訂正を要求する権利</li>
                    <li>
                      特定の状況において、お客様の個人データの消去を当社に対して要求する権利。特定の状況には以下の状況が含まれます（ただし、これらに限定されるものではありません。）。
                    </li>
                    <ol style={{ listStyleType: 'lower-roman' }} className={PrivacyDesign.seconSubPoints}>
                      <li>当社がお客様の個人データを収集した目的に照らし、当社がお客様の個人データを保持する必要がなくなった場合。</li>
                      <li>
                        お客様の同意に基づいてのみ、当社がお客様の個人データを処理する権利を有する場合であって、お客様がその同意を撤回した場合。
                      </li>
                      <li>
                        正当な利益を根拠として当社がお客様の個人データを処理することに対してお客様が異議を述べ、当該正当な利益がお客様自身の利益、権利及び自由に優先するものではない場合。
                      </li>
                    </ol>
                    <li>
                      特定の状況において、当社による個人データの処理を制限することを当社に対して要求する権利。特定の状況には以下の状況が含まれます（ただし、これらに限定されるものではありません。）。
                    </li>
                    <ol style={{ listStyleType: 'lower-roman' }} className={PrivacyDesign.seconSubPoints}>
                      <li>
                        お客様が自身の個人データの正確性に異議を唱えている場合（ただし、当社がお客様の個人データの正確性を検証するために必要な期間に限ります。）。
                      </li>
                      <li>法的主張の立証、行使又は防御のためである場合を除き、当社がお客様の個人データを使用する必要がなくなった場合。</li>
                      <li>
                        正当な利益を根拠として当社がお客様の個人データを処理することに対してお客様が異議を述べる場合（ただし、当該正当な利益がお客様自身の利益、権利及び自由に優先するものであるかを当社が判断するのに必要な期間に限ります。）。
                      </li>
                    </ol>
                    <li>お客様の個人データの処理に関して、当社に対し異議を述べる権利</li>
                    <li>
                      （他の法的根拠ではなく）お客様の同意を根拠として、かつ処理が自動化された手段により行われるときに、当社が処理するお客様に関する個人データを、構造化され、一般的に利用され機械可読性のある形式で受け取る権利、及び/又は、当社が技術的に実行可能な範囲で受領者に対してその個人データを移転することを要求する権利。なお、この権利は、お客様が当社に提供した個人データのみを対象とする点にご留意ください。
                    </li>
                    <li>
                      お客様の個人データの処理に関する同意をいつでも撤回する権利。ただし、当社が他の法的根拠に基づいてお客様の個人データを処理することができる場合、当社は引き続きお客様の個人データを処理する権利を有する点にご留意ください。
                    </li>
                    <p className={PrivacyDesign.eachParaText}>
                      お客様は、下記の第12項に記載する当社の連絡先に連絡することにより、権利を行使することができます。当社により権利が侵害されたと考える場合には、管轄権を有するデータ保護当局に苦情を申し立てることも可能です。
                    </p>
                  </ol>

                  {/* point 10----------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>本プライバシー通知の変更</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    当社は本ノーティスを適宜変更することがあり、必要に応じて変更後の通知を掲載します。本ノーティスを定期的にご確認することをお勧めいたします。本ノーティスに重大な変更を行った場合、当社は、当該変更について当社ウェブサイト上で通知するなど、お客様に適切にお知らせします。
                  </p>
                  {/* point 11----------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>第三者ウェブサイトへのリンク</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    当社のウェブサイトには第三者ウェブサイトへのリンク及び第三者ウェブサイトからのリンクが含まれます。これらのウェブサイト及び当該ウェブサイトを通じてアクセス可能なサービスには、それぞれのウェブサイト及びサービスのプライバシーポリシーが適用されます。当社は、他のウェブサイトにおけるプライバシーに係る取り組みについて、責任を負いません。当社のウェブサイトを離れる際はこの点に留意し、第三者ウェブサイトにおいて適用されるプライバシーポリシーをご確認いただくようお願いいたします
                  </p>
                  {/* point 12----------- */}
                  <li>
                    <span className={PrivacyDesign.listText}>連絡先</span>
                  </li>
                  <p className={PrivacyDesign.eachParaText}>
                    本ノーティスに関するご質問、ご意見又はご要望がある場合は、下記の連絡先にお問い合わせください。
                  </p>
                </ol>

                {/* last part------------- */}
                <div className={PrivacyDesign.lastTotaldiv}>
                  <p>管理者（当社）：</p>
                  <div className={PrivacyDesign.lastPart}>
                    <p>会社名：Scalably株式会社</p>
                    <p>代表取締役：山本純矢</p>
                    <p>本社所在地：東京都港区虎ノ門4丁目1－6 第二大石ビル5階</p>
                    <p>電子メールアドレス：info@scalably.com</p>
                  </div>
                </div>

                {/* last page(9) --------------- */}
                <p className={PrivacyDesign.title12}>クッキーポリシー</p>
                <p className={PrivacyDesign.eachParaText}>
                  当社は、本クッキーポリシーに記載の目的のために、クッキーを使用しています。クッキーはお客様の端末装置上に保存される小さなファイルです。当社が使用しているクッキーは以下のとおりです。
                </p>
                <p className={PrivacyDesign.title13}> 必須のクッキー </p>
                <p className={PrivacyDesign.eachParaText}>
                  このタイプのクッキーは当社のウェブサイトの作動に必要であり、当社のシステムにおいて停止することができません。このタイプのクッキーは、通常、お客様のプライバシーに関する設定、ログイン又はフォームへの記入等の、サービス要求のためにお客様が行う操作に応じてのみ設定されるものです。お客様は、これらのクッキーをブロックするため又はこれらのクッキーに関する警告を発するようにご自身のブラウザを設定することができますが、その場合、一部のサイトが作動しない可能性があります。
                </p>
                <p className={PrivacyDesign.eachParaText}>
                  必須のクッキーに関して処理されたEEA及び英国のお客様の情報が個人データに該当する場合、当該処理の法的根拠は、当社がウェブサイトを運営することに関する正当な利益です。
                </p>
                <p className={PrivacyDesign.eachParaText}>当社のウェブサイトは、以下の必須のクッキーを使用しています。</p>

                {/* Table --------------------------- */}
                <div className={PrivacyDesign.tableText}>
                  <table>
                    <thead>
                      <tr>
                        <th>クッキー名</th>
                        <th>ソース</th>
                        <th>利用目的・説明</th>
                        <th>有効期限</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>wp-wpml_current_language</td>
                        <td>【クッキー発行元ドメインを記載】</td>
                        <td>現在表示している言語を保持します。</td>
                        <td>0日</td>
                      </tr>
                      <tr>
                        <td>wordpress_logged_in_df9616759138eda30207b5739f0c341d</td>
                        <td>【クッキー発行元ドメインを記載】</td>
                        <td>現在の訪問者がログイン中のユーザーかどうかを確認するのに使われます。。</td>
                        <td>14日</td>
                      </tr>
                      <tr>
                        <td>wordpress_test_cookie</td>
                        <td>【クッキー発行元ドメインを記載】</td>
                        <td>ブラウザーがCookie を受け入れるかをテストします。</td>
                        <td>0日</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </CommonLayout>
    </>
  );
};

export default Privacy;
