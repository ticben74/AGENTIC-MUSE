
export interface Message {
  role: 'user' | 'bot';
  content: string;
}

export interface GuideSection {
  id: string;
  title: string;
  icon: string;
  content: string;
}
