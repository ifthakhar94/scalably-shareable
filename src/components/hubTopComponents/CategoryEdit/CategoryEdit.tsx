import useEditCategoryHook from '@/hooks/categoryHooks/useEditCategoryHook';
import { setCategories } from '@/redux/features/CategoryInputSlice/categoryInputSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import type { AppDispatch } from './../../../redux/app/store';
import modalCommonStyles from './../hubTopModal.module.css';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

const KeyCodes = {
  comma: 188,
  enter: 13
};
export interface Tag {
  id: string;
  text: string;
}
export interface CatTypes {
  name: string;
  id: string;
  text: string;
}

const delimiters = [KeyCodes.comma, KeyCodes.enter];
interface dataPropsTypes {
  existingData: Tag[];
  setTagLength: (value: boolean) => void;
  setDuplicateCat: (value: boolean) => void;
}
export const fetched_suggestions: string[] = [];
const CategoryEdit = ({ existingData, setTagLength, setDuplicateCat }: dataPropsTypes) => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [uniqueData, setUniqueData] = React.useState<Tag[]>(existingData);
  const [hubCategoryList, setHubCategoryList] = React.useState<CatTypes[] | undefined>([]);

  const suggestions = fetched_suggestions.map((sigle_suggestion) => {
    return {
      id: sigle_suggestion,
      text: sigle_suggestion
    };
  });

  useEffect(() => {
    hubCategoryList?.map((category: CatTypes) => fetched_suggestions.push(category?.name));
  }, [hubCategoryList]);

  useEffect(() => {
    return setTags(existingData);
  }, []);

  const handleDelete = (i: any) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: any) => {
    setTagLength(false);
    const state = () => {
      setTagLength(true);
    };
    const categoryLength: number = tag.text.length;

    if (categoryLength > 30) {
      state();
    } else {
      // Compare new and old data and filter for unique data.

      const matches = tags.filter((item) => item.id === tag.id && item.text === tag.text);

      if (matches.length > 0) {
        setDuplicateCat(true);
        const uniqueItems = tags.filter((item) => item.id !== tag.id || item.text !== tag.text);
        setUniqueData([...uniqueItems, matches[0]].sort((a, b) => a.id.localeCompare(b.id)));
        setTags(uniqueData);
      } else {
        setDuplicateCat(false);
        setUniqueData([...tags, tag]);
        setTags([...tags, tag]);
      }

      setTagLength(false);
    }
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const dispatch = useAppDispatch();

  dispatch(setCategories(tags));

  function handleInputChange(value: string): void {
    const getData = setTimeout(() => {
      useEditCategoryHook(value, setHubCategoryList);
    }, 300);
  }

  return (
    <>
      <div className={modalCommonStyles.tag_input_content}>
        <div className={modalCommonStyles.tag_input_content_inner}>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            inputFieldPosition="inline"
            autocomplete={false}
            placeholder="+ 追加する"
            handleInputChange={handleInputChange}
            allowUnique={false}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryEdit;
