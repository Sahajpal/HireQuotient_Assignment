import { useState, useRef } from 'react';

const EditableTextItem = ({ initialText }: {initialText: any}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Save the changes or perform any required actions here
  };

  // Focus the input field when editing starts

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputRef}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default EditableTextItem;