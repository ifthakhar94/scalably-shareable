import Styles from './ConditionalCategory.module.css';
type CategoriesTypes = {
  categories: string[];
};

const ConditionalCategory = ({ categories }: CategoriesTypes) => {
  return (
    <>
      <table className={Styles.conditional_category}>
        <tbody>
          <tr>
            {categories.slice(0, 4).map((category, index) => {
              return <td key={index}>{category}</td>;
            })}

            {/* For no category found text, please uncomment the following code  */}
            {categories.length > 4 && <td className={Styles.category_dots}>...</td>}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ConditionalCategory;
