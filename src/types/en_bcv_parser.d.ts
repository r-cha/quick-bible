declare module 'bible-passage-reference-parser/js/en_bcv_parser' {
  export interface ParsedEntity {
    osis: string;
    type: "bc";
    indices: [number, number];
    translations: string[];
    start: { b: string; c: number; v: number };
    end: { b: string; c: number; v: number };
    enclosed_indices: [number, number];
    entity_id: number;
    entities: {
      start: { b: string; c: number; v: number };
      end: { b: string; c: number; v: number };
      valid: { valid: boolean; messages: any };
      type: "bc";
      absolute_indices: [number, number];
      enclosed_absolute_indices: [number, number];
    }[];
  }

  type Options = {
    consecutive_combination_strategy: string;
    osis_compaction_strategy: string;
    book_sequence_strategy: string;
    invalid_sequence_strategy: string;
    sequence_combination_strategy: string;
    punctuation_strategy: string;
    invalid_passage_strategy: string;
    non_latin_digits_strategy: string;
    passage_existence_strategy: string;
    zero_chapter_strategy: string;
    zero_verse_strategy: string;
    single_chapter_1_strategy: string;
    book_alone_strategy: string;
    book_range_strategy: string;
    captive_end_digits_strategy: string;
    end_range_digits_strategy: string;
    include_apocrypha: boolean;
    ps151_strategy: string;
    versification_system: string;
    case_sensitive: string;
  }

  interface Book {
    osis: string[];
    apocrypha?: boolean;
    extra?: string;
    regexp: RegExp;
  }

  interface Translations {
    [key: string]: {
      alias?: string;
      osis?: string;
      order?: { [key: string]: number };
      chapters?: { [key: string]: number[] };
    };
  }

  interface Passage {
    books: any[];
    indices: { [key: string]: number };
    options: Options;
    translations: Translations;
  }

  export class bcv_parser {
    constructor();
    s: string;
    entities: any[];
    passage: Passage | null;
    regexps: { [key: string]: any };
    options: Options;
    versification_system(system: string): this;
    case_sensitive(arg: string): this;
    translation_info(new_translation?: string): {
      alias: string;
      books: string[];
      chapters: { [key: string]: number[] };
      order: { [key: string]: number };
    };
    replace_control_characters(s: string): string;
    match_books(s: string): [string, any[]];
    get_book_indices(books: any[], s: string): any[];
    match_passages(s: string): [any[], any];
    adjust_regexp_end(accum: any[], old_length: number, new_length: number): number;
    replace_match_end(part: string): string;
    create_book_range(s: string, passage: any, book_id: number): boolean;
    add_book_range_object(passage: any, prev: any[], start_book_number: number): void;
    snap_range(entity: any, passage_i: number): any;
    snap_sequence(type: string, entity: any, osises: any[], i: number, length: number): any;
    get_snap_sequence_i(passages: any[], i: number, length: number): number;
    starts_with_book(passage: any): boolean;
    remove_absolute_indices(passages: any[], i: number): boolean;
    osis(): string;
    osis_and_translations(): [string, string][];
    osis_and_indices(): {
      osis: string;
      translations: string[];
      indices: [number, number];
    }[];
    parsed_entities(): {
      osis: string;
      translations: string[];
      indices: [number, number];
      entity_id: number;
      entities: ParsedEntity[];
    }[];
    to_osis(start: any, end: any, translation: string): string;
    fix_ps151(start: any, end: any, translation: string): void;
    combine_consecutive_passages(osises: any[], translation: string): any[];
    snap_enclosed_indices(osises: any[]): any[];
    is_verse_consecutive(prev: any, check: any, translation: string): boolean;
    reset(): void;
    set_options(options: Partial<Options>): this;
    include_apocrypha(arg: boolean): this;
    parse(s: string): bcv_parser;
    parse_with_context(s: string, context: string): this;
  }
}