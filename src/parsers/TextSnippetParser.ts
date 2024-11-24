import { App } from 'obsidian';
import TemplateEngine from 'src/template/TemplateEngine';
import { ReadItLaterSettings } from '../settings';
import { Parser } from './Parser';
import { Note } from './Note';

class TextSnippetParser extends Parser {
    constructor(app: App, settings: ReadItLaterSettings, templateEngine: TemplateEngine) {
        super(app, settings, templateEngine);
    }

    test(): boolean {
        return true;
    }

    async prepareNote(text: string): Promise<Note> {
        const createdAt = new Date();
        const fileNameTemplate = this.settings.textSnippetNoteTitle.replace(
            /%date%/g,
            this.getFormattedDateForFilename(createdAt),
        );

        const content = this.settings.textSnippetNote
            .replace(/%content%/g, () => text)
            .replace(/%date%/g, this.getFormattedDateForContent(createdAt));
        return new Note(fileNameTemplate, 'md', content, this.settings.textSnippetContentType, createdAt);
    }
}

export default TextSnippetParser;
