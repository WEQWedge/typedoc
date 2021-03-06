"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag_1 = require("./tag");
class Comment {
    constructor(shortText, text) {
        this.shortText = shortText || '';
        this.text = text || '';
    }
    hasVisibleComponent() {
        return !!this.shortText || !!this.text || !!this.tags;
    }
    hasTag(tagName) {
        if (!this.tags) {
            return false;
        }
        for (let i = 0, c = this.tags.length; i < c; i++) {
            if (this.tags[i].tagName === tagName) {
                return true;
            }
        }
        return false;
    }
    getTag(tagName, paramName) {
        return (this.tags || []).find(tag => {
            return tag.tagName === tagName && (paramName === void 0 || tag.paramName === paramName);
        });
    }
    copyFrom(comment) {
        this.shortText = comment.shortText;
        this.text = comment.text;
        this.returns = comment.returns;
        this.tags = comment.tags ? comment.tags.map((tag) => new tag_1.CommentTag(tag.tagName, tag.paramName, tag.text)) : undefined;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map