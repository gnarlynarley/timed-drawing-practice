import { createStore } from '~src/lib/utils/store';
import { FileEntry } from '~src/lib/models';

export default class PracticeMachine {
  #files: FileEntry[];
  #pool: FileEntry[];
  history = createStore<FileEntry[]>([]);
  currentFile = createStore<FileEntry | null>(null);
  #duration: number;
  #amount: number;
  time = createStore(0);
  playing = createStore(false);

  constructor(duration: number, amount: number, files: FileEntry[]) {
    this.#duration = duration;
    this.#amount = amount;
    this.#files = files;
    this.#pool = [...files];
    this.next();
  }

  intervalId: number | null = null;

  #reachedEnd() {
    const history = this.history.getState();
    return history.length >= this.#amount;
  }

  play() {
    if (this.#reachedEnd()) return this.stop();
    this.playing.setState(true);
    const duration = this.#duration;
    const deltaSeconds = 0.5;
    this.intervalId = setInterval(() => {
      const next = this.time.getState() + deltaSeconds;
      if (next >= duration) {
        this.next();
      }
      this.time.setState(next % duration);
    }, deltaSeconds * 1000);
  }

  pause() {
    this.playing.setState(false);
    this.intervalId && clearInterval(this.intervalId);
    this.intervalId = null;
  }

  toggle() {
    if (this.playing.getState()) {
      this.pause();
    } else {
      this.play();
    }
  }

  reset() {
    this.#pool = [...this.#files];
    this.history.setState([]);
  }

  skip() {
    this.next(true);
  }

  stop() {
    this.pause();
    this.currentFile.setState(null);
  }

  next(skip = false) {
    const randomIndex = Math.floor(Math.random() * this.#pool.length);
    const nextFile = this.#pool[randomIndex];
    if (nextFile) this.#pool.splice(randomIndex, 1);
    if (skip === false) {
      const previousFile = this.currentFile.getState();
      if (previousFile) {
        const nextHistory = [...this.history.getState(), previousFile];
        this.history.setState(nextHistory);
        if (this.#reachedEnd()) {
          this.stop();
          return;
        }
      }
    }
    this.currentFile.setState(nextFile);
    this.time.setState(0);
  }
}
