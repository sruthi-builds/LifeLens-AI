import { useState } from 'react';
import { PlusIcon } from './Icons.jsx';

/**
 * ChipInput
 * Controlled chip/tag field.
 *
 * Props:
 *  label       — visible field label
 *  chips       — string[]  (current list, from parent state)
 *  onChange    — (newChips: string[]) => void
 *  placeholder — input placeholder text
 *  hint        — optional hint below the add row
 */
export default function ChipInput({ label, chips, onChange, placeholder = 'Type and press Add…', hint }) {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const val = draft.trim();
    if (!val) return;
    if (!chips.includes(val)) {
      onChange([...chips, val]);
    }
    setDraft('');
  };

  const remove = (item) => onChange(chips.filter((c) => c !== item));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    }
    if (e.key === 'Backspace' && draft === '' && chips.length > 0) {
      onChange(chips.slice(0, -1));
    }
  };

  return (
    <div className="pf-field chip-input-wrap">
      <label className="pf-label">{label}</label>

      <div className="chip-add-row">
        <input
          type="text"
          className="input-field"
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="chip-add-btn" onClick={commit} aria-label={`Add ${label}`}>
          <PlusIcon size={14} /> Add
        </button>
      </div>

      {chips.length > 0 && (
        <ul className="chip-list" role="list">
          {chips.map((item) => (
            <li key={item} className="chip">
              <span className="chip__label">{item}</span>
              <button
                type="button"
                className="chip__remove"
                onClick={() => remove(item)}
                aria-label={`Remove ${item}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {hint && chips.length === 0 && <p className="chip-hint">{hint}</p>}
    </div>
  );
}