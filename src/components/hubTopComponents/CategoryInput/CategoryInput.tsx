import useInputCategoryHook from '@/hooks/categoryHooks/useInputCategoryHook';
import { setCategories } from '@/redux/features/CategoryInputSlice/categoryInputSlice';
import React, { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import type { AppDispatch, RootState } from '../../../redux/app/store';
import modalCommonStyles from './../hubTopModal.module.css';
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const KeyCodes = {
  comma: 188,
  enter: 13
};
export interface Tag {
  [x: string]: string;
  id: string;
  text: string;
}
type tagProps = {
  setTagLength: (value: boolean) => void;
  setDuplicateCat: (value: boolean) => void;
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
export const fetched_suggestions: string[] = [];
const CatogeryInput = ({ setTagLength, setDuplicateCat }: tagProps) => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [uniqueData, setUniqueData] = React.useState<Tag[]>([]);
  const [hubCategoryList, setHubCategoryList] = React.useState<Tag[] | undefined>([]);
  const suggestions = fetched_suggestions.map((sigle_suggestion) => {
    return {
      id: sigle_suggestion,
      text: sigle_suggestion
    };
  });
  hubCategoryList?.map((category) => {
    fetched_suggestions.push(category?.name);
    // console.log(category);
  });
  useEffect(() => {
    useInputCategoryHook(setHubCategoryList);
  }, []);

  const handleDelete = (i: any) => {
    setTags(tags?.filter((tag, index) => index !== i));
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

  const handleTagClick = (index: any) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const dispatch = useAppDispatch();

  dispatch(setCategories(tags));

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
            handleTagClick={handleTagClick}
            inputFieldPosition="inline"
            autocomplete={false}
            placeholder="+ 追加する"
            allowUnique={false}
          />
        </div>
      </div>
    </>
  );
};

export default CatogeryInput;
