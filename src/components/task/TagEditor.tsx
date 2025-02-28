
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";

interface TagEditorProps {
  taskId: string;
  availableTags: string[];
  onUpdateTag: (newTag: string) => void;
  onUpdateTagColor: (color: string) => void;
  onTagDelete: (tag: string, e: React.MouseEvent) => void;
  showColorPicker: boolean;
  setShowColorPicker: (taskId: string | null) => void;
  closeTagEditor: () => void;
}

export const TagEditor = ({
  taskId,
  availableTags,
  onUpdateTag,
  onUpdateTagColor,
  onTagDelete,
  showColorPicker,
  setShowColorPicker,
  closeTagEditor
}: TagEditorProps) => {
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium">Select Tag</span>
        <Button
          size="icon"
          variant="ghost"
          className="h-5 w-5"
          onClick={closeTagEditor}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-1 max-w-[200px]">
        {availableTags.map(tag => (
          <Button 
            key={tag}
            variant="outline" 
            size="sm" 
            onClick={() => {
              onUpdateTag(tag);
              closeTagEditor();
            }}
            className={`h-6 px-2 py-0 text-xs flex items-center gap-1 tag-${tag}`}
          >
            {tag}
          </Button>
        ))}
      </div>
      
      <div className="mt-2">
        <div className="text-xs font-medium mb-1">Color</div>
        <div className="flex flex-wrap gap-1">
          {['red', 'blue', 'green', 'purple', 'yellow', 'pink', 'indigo', 'teal'].map(color => (
            <Button
              key={color}
              variant="outline"
              size="sm"
              onClick={() => {
                onUpdateTagColor(color);
                closeTagEditor();
              }}
              className={`h-6 w-6 p-0 rounded-full border-2 tag-${color}`}
              style={{
                backgroundColor: `var(--${color}-100, #f0f9ff)`,
                borderColor: `var(--${color}-300, #93c5fd)`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        <p>Manage tags in Settings</p>
      </div>
    </div>
  );
};
