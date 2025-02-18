export interface ModeloMangas {
    data: Data
  }
  
  export interface Data {
    mal_id: number
    url: string
    images: Images
    approved: boolean
    titles: Title[]
    title: string
    title_english: string
    title_japanese: string
    title_synonyms: string[]
    type: string
    chapters: number
    volumes: number
    status: string
    publishing: boolean
    published: Published
    score: number
    scored_by: number
    rank: number
    popularity: number
    members: number
    favorites: number
    synopsis: string
    background: string
    authors: Author[]
    serializations: Serialization[]
    genres: Genre[]
    explicit_genres: ExplicitGenre[]
    themes: Theme[]
    demographics: Demographic[]
    relations: Relation[]
    external: External[]
  }
  
  export interface Images {
    jpg: Jpg
    webp: Webp
  }
  
  export interface Jpg {
    image_url: string
    small_image_url: string
    large_image_url: string
  }
  
  export interface Webp {
    image_url: string
    small_image_url: string
    large_image_url: string
  }
  
  export interface Title {
    type: string
    title: string
  }
  
  export interface Published {
    from: string
    to: string
    prop: Prop
  }
  
  export interface Prop {
    from: From
    to: To
    string: string
  }
  
  export interface From {
    day: number
    month: number
    year: number
  }
  
  export interface To {
    day: number
    month: number
    year: number
  }
  
  export interface Author {
    mal_id: number
    type: string
    name: string
    url: string
  }
  
  export interface Serialization {
    mal_id: number
    type: string
    name: string
    url: string
  }
  
  export interface Genre {
    mal_id: number
    type: string
    name: string
    url: string
  }
  
  export interface ExplicitGenre {
    mal_id: number
    type: string
    name: string
    url: string
  }
  
  export interface Theme {
    mal_id: number
    type: string
    name: string
    url: string
  }
  
  export interface Demographic {
    mal_id: number
    type: string
    name: string
    url: string
  }
  
  export interface Relation {
    relation: string
    entry: Entry[]
  }
  
  export interface Entry {
    mal_id: number
    type: string
    name: string
    url: string
  }
  
  export interface External {
    name: string
    url: string
  }
  export interface Manga {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    genreId: string;  // Este campo es importante para asociar mangas a un género
  }
  export interface Genres {
    id: string;
    name: string;
    url: string;
  }
    
  