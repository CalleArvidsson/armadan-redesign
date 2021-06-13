export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

// POST
export interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
}

export type AddPostInput = Omit<Post, 'id' | 'createdAt'>;
export type UpdatePostInput = Omit<Post, 'createdAt'>;

// HOLE
export interface Hole {
  id: string;
  nr: number;
  index: number;
  par: number;
}

export type AddHoleInput = Omit<Hole, 'id'>;
export type UpdateHoleInput = Hole;

// TEE
export interface Tee {
  id: string;
  name: string;
  cr: number;
  slope: number;
}

export type AddTeeInput = Omit<Tee, 'id'>;
export type UpdateTeeInput = Optional<Tee, 'id'>;

// COURSE
export interface Course {
  id: string;
  name: string;
  par: number;
  holes: Hole[];
  tees: Tee[];
}

export type AddCourseInput = Omit<Course, 'id' | 'holes' | 'tees'> & { holes: AddHoleInput[]; tees: AddTeeInput[] };
export type UpdateCourseInput = Omit<Course, 'tees'> & { tees: UpdateTeeInput[] };

// WEEK
export interface Week {
  id: string;
  nr: number;
  hasResults: boolean;
  course: Course;
  tee: Tee;
}

export type AddWeekInput = {
  weeks: (Omit<PartialBy<Week, 'id'>, 'course' | 'tee'> & { course: string; tee: string })[];
};

// PLAYER
export interface Player {
  id: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  name: string;
  hcp: number;
  points: number;
}

export type AddPlayerInput = Omit<PartialBy<Player, 'id' | 'userId'>, 'points' | 'name'> & { hcpDiff?: number };

export type AddPlayersInput = {
  players: AddPlayerInput[];
};

export type Leader = Pick<Player, 'name' | 'points'> & { rounds: number };

// SCORE
export interface Score {
  id: string;
  strokes: number;
  hole: Hole;
}

// ROUND
export interface Round {
  id: string;
  player: Player;
  scores: Score[];
  netIn: number;
  netOut: number;
  netTotal: number;
  grossIn: number;
  grossOut: number;
  grossTotal: number;
}

// WINNER
export interface Winner {
  id: string;
  points: number;
  player: Player;
}

// RESULT
export interface Result {
  id: string;
  week: Week;
  rounds: Round[];
  winners: Winner[];
}

// SHARED
export interface RemoveInput {
  id: string;
}

export interface DeletedId {
  deletedId: string;
}

export interface MutationOptions {
  onCompleted?(): void;
  onError?(): void;
}
