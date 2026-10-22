export interface Survivor {
  id: string;
  name: string;
  group: '철새' | '블랙캣' | '백야' | '까마귀' | '단독생존자';
  mbti: string;
  age: number;
  gender: '女' | '男';
  height: string;
  personality: string;
  appearance: string; // 옷차림 + 머리색 + 눈색
  imageUrl: string;
  isLeader?: boolean;
}

export interface SurvivorGroup {
  id: string;
  name: string;
  leader: string;
  base: string;
}

export interface LocationItem {
  id: string;
  name: string;
  imageUrl: string;
}

export interface ZombieType {
  id: string;
  name: string;
  imageUrl: string;
  behavior: string;
}

// 1. 세계관 정보 (간단 요약)
export const WORLD_OVERVIEW_SIMPLE = [
  {
    title: '혹한의 묵시록 (2026년)',
    text: '원인불명의 급격한 기후 재앙으로 전 세계가 영하 20~30도의 혹한과 끝없는 눈보라에 잠식되었습니다.'
  },
  {
    title: '문명 붕괴와 좀비 사태',
    text: '정부·군대·전력망·통신망이 전면 마비되었으며, 동시에 발생한 정체불명의 바이러스로 좀비들이 출몰합니다.'
  },
  {
    title: '생존 환경',
    text: '야외는 동상과 저체온증의 극단적 위험이 도사리지만, 폐쇄된 건물 내부로 들어가면 생존 가능한 온기가 유지됩니다.'
  },
  {
    title: '생존자 거점과 갈등',
    text: '지하철역, 백화점, 방송국, 옥상 온실 등에 거점을 마련한 생존자 집단 간의 거래와 약탈, 영역 갈등이 계속됩니다.'
  }
];

// 2. 생존자 그룹 정보 (전체 탭 제거, 무리별 탭용)
export const SURVIVOR_GROUPS: SurvivorGroup[] = [
  {
    id: 'chulsae',
    name: '철새',
    leader: '한도윤',
    base: '폐쇄된 지하철역'
  },
  {
    id: 'blackcat',
    name: '블랙캣',
    leader: '윤채린',
    base: '폐백화점 상층부'
  },
  {
    id: 'baekya',
    name: '백야',
    leader: '유시아',
    base: '폐건물 옥상 온실'
  },
  {
    id: 'kkamagi',
    name: '까마귀',
    leader: '한유리',
    base: '폐방송국 상층부 송신실'
  },
  {
    id: 'solo',
    name: '단독생존자',
    leader: '서리안',
    base: '임시 은신처 이동'
  }
];

// 3. 생존자 목록 (MBTI, 성격 간단, 키/성별/나이, 옷차림+머리색+눈색만 묘사)
export const SURVIVORS: Survivor[] = [
  // 철새 (4명)
  {
    id: 'handoyoon',
    name: '한도윤',
    group: '철새',
    mbti: 'ESFJ',
    age: 40,
    gender: '男',
    height: '187cm',
    personality: '호탕, 다정, 책임감, 낙천적',
    appearance: '베이지 패딩 + 검은 목도리 / 갈색 머리 / 갈색 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/7',
    isLeader: true
  },
  {
    id: 'kangsiwoo',
    name: '강시우',
    group: '철새',
    mbti: 'ISTP',
    age: 26,
    gender: '男',
    height: '183cm',
    personality: '무뚝뚝, 과묵, 신중',
    appearance: '녹색 방한모 + 카키 군용 패딩 / 녹색 숏컷 / 갈색 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/3'
  },
  {
    id: 'chaeunhyuk',
    name: '차은혁',
    group: '철새',
    mbti: 'INTJ',
    age: 27,
    gender: '男',
    height: '185cm',
    personality: '냉소적, 예민, 이성적',
    appearance: '회색 모피 패딩 + 고글 / 은회색 숏컷 / 노란 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/4'
  },
  {
    id: 'baekseoha',
    name: '백서하',
    group: '철새',
    mbti: 'ISTJ',
    age: 24,
    gender: '女',
    height: '162cm',
    personality: '조용, 꼼꼼, 경계심',
    appearance: '흰 모피 후드 패딩 / 검은 긴 웨이브 / 연보라 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/9'
  },

  // 블랙캣 (3명)
  {
    id: 'yunchaerin',
    name: '윤채린',
    group: '블랙캣',
    mbti: 'ENTJ',
    age: 25,
    gender: '女',
    height: '165cm',
    personality: '영악, 능글, 자신감',
    appearance: '호피 패딩 + 검은 리본 / 베이지 웨이브 포니테일 / 회색 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/2',
    isLeader: true
  },
  {
    id: 'leenael',
    name: '이나엘',
    group: '블랙캣',
    mbti: 'ENFP',
    age: 22,
    gender: '女',
    height: '166cm',
    personality: '활발, 긍정적, 호기심',
    appearance: '노란 패딩 + 고글 / 금발 장발 / 분홍 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/10'
  },
  {
    id: 'kwontaegon',
    name: '권태건',
    group: '블랙캣',
    mbti: 'ENFP',
    age: 28,
    gender: '男',
    height: '189cm',
    personality: '감정 풍부, 정 많음, 충동적',
    appearance: '검은 모피 패딩 / 백발 숏컷 / 회색 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/11'
  },

  // 백야 (3명)
  {
    id: 'yoosia',
    name: '유시아',
    group: '백야',
    mbti: 'ENFJ',
    age: 26,
    gender: '女',
    height: '168cm',
    personality: '주도적, 대담, 사교적',
    appearance: '검은 모피 모자 + 검은 패딩 / 분홍빛 갈색 장발 / 분홍 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/12',
    isLeader: true
  },
  {
    id: 'ohmigyeong',
    name: '오미경',
    group: '백야',
    mbti: 'ISFJ',
    age: 43,
    gender: '女',
    height: '165cm',
    personality: '다정, 걱정 많음, 생활력',
    appearance: '흰 귀도리 + 남색 모피 패딩 / 남색 긴 머리 / 푸른 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/8'
  },
  {
    id: 'choiyooseol',
    name: '최유설',
    group: '백야',
    mbti: 'ESFP',
    age: 21,
    gender: '女',
    height: '154cm',
    personality: '애교, 장난기, 낙천적',
    appearance: '흰 모피 후드 패딩 + 빨간 목도리 / 은백색 숏컷 / 빨간 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/13'
  },

  // 까마귀 (2명)
  {
    id: 'hanyuri',
    name: '한유리',
    group: '까마귀',
    mbti: 'ESTP',
    age: 24,
    gender: '女',
    height: '158cm',
    personality: '장난기, 능청, 생활력',
    appearance: '검은 고양이귀 후드 + 검은 모피 패딩 / 분홍 단발 / 회색 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/6',
    isLeader: true
  },
  {
    id: 'hanyujun',
    name: '한유준',
    group: '까마귀',
    mbti: 'INTP',
    age: 22,
    gender: '男',
    height: '181cm',
    personality: '느긋, 능글, 뛰어난 관찰력',
    appearance: '안경 + 검은 고양이귀 후드 / 분홍 중단발 / 회색 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/5'
  },

  // 단독생존자 (1명)
  {
    id: 'seorian',
    name: '서리안',
    group: '단독생존자',
    mbti: 'INTJ',
    age: 23,
    gender: '女',
    height: '156cm',
    personality: '냉철, 효율 중시, 독립적',
    appearance: '흰 모피 코트 + 나비 장식 / 은색·청색 투톤 단발 / 푸른 눈',
    imageUrl: 'https://igx.kr/v/Lmc/w/1',
    isLeader: true
  }
];

// 4. 생존 수칙 (간단 요약, RP 지침 삭제)
export const SURVIVAL_RULES_SIMPLE = [
  {
    title: '체온 및 방한',
    desc: '영하 20~30도 혹한으로 야외 노출 시 동상·저체온증 위험. 외출 시 방한 장비 필수, 건물 내부 대피 시 체온 회복 가능.'
  },
  {
    title: '식수 및 식량',
    desc: '눈을 직접 먹으면 체온이 급락하므로 반드시 끓여 마실 것. 초코바, 통조림 등 고열량 보존식 위주 섭취.'
  },
  {
    title: '연료 및 난방',
    desc: '발전기용 디젤과 난방용 기름은 필수 자원. 실내 화기 사용 시 일산화탄소 중독 주의.'
  },
  {
    title: '부상 및 피로',
    desc: '무리한 이동을 피하고 안전한 거점에서 휴식 시 부상과 피로는 시간이 지나면 점진적으로 회복됨.'
  }
];

// 5. 주요 장소 목록 (사진 전용)
export const LOCATIONS: LocationItem[] = [
  { id: 'loc-city', name: '도시', imageUrl: 'https://igx.kr/v/Lmc/w/24' },
  { id: 'loc-cvs', name: '편의점', imageUrl: 'https://igx.kr/v/Lmc/w/25' },
  { id: 'loc-gas', name: '주유소', imageUrl: 'https://igx.kr/v/Lmc/w/26' },
  { id: 'loc-police', name: '경찰서', imageUrl: 'https://igx.kr/v/Lmc/w/27' },
  { id: 'loc-hospital', name: '병원', imageUrl: 'https://igx.kr/v/Lmc/w/28' },
  { id: 'loc-subway', name: '지하철역', imageUrl: 'https://igx.kr/v/Lmc/w/29' },
  { id: 'loc-broadcast', name: '방송국', imageUrl: 'https://igx.kr/v/Lmc/w/30' },
  { id: 'loc-greenhouse', name: '옥상 온실', imageUrl: 'https://igx.kr/v/Lmc/w/31' },
  { id: 'loc-apt', name: '아파트', imageUrl: 'https://igx.kr/v/Lmc/w/32' },
  { id: 'loc-church', name: '교회', imageUrl: 'https://igx.kr/v/Lmc/w/33' },
  { id: 'loc-military', name: '군부대', imageUrl: 'https://igx.kr/v/Lmc/w/34' },
  { id: 'loc-mall', name: '백화점', imageUrl: 'https://igx.kr/v/Lmc/w/35' },
  { id: 'loc-lab', name: '연구소', imageUrl: 'https://igx.kr/v/Lmc/w/36' },
  { id: 'loc-snowmountain', name: '설산', imageUrl: 'https://igx.kr/v/Lmc/w/37' }
];

// 6. 좀비 정보 (사진 전체 노출 + 행동 양식만 표시, 생체특징 및 대응책 삭제, 부제 삭제)
export const ZOMBIE_TYPES: ZombieType[] = [
  {
    id: 'z-normal',
    name: '일반형',
    imageUrl: 'https://igx.kr/v/Lmc/w/14',
    behavior: '이동 속도는 느리지만 무리를 지어 집단 행동하며, 소음과 진동, 체온에 반응해 몰려듭니다.'
  },
  {
    id: 'z-frozen',
    name: '동결형',
    imageUrl: 'https://igx.kr/v/Lmc/w/17',
    behavior: '얼음과 눈더미 속에 웅크려 잠복해 있다가, 생존자가 가까이 접근하면 갑자기 튀어나와 기습합니다.'
  },
  {
    id: 'z-runner',
    name: '질주형',
    imageUrl: 'https://igx.kr/v/Lmc/w/15',
    behavior: '눈보라를 뚫고 폭발적인 속도로 질주하며 표적을 끝까지 지칠 줄 모르고 추격합니다.'
  },
  {
    id: 'z-mutant',
    name: '변이형',
    imageUrl: 'https://igx.kr/v/Lmc/w/16',
    behavior: '장기간 감염으로 신체가 비정상적으로 거대해졌으며, 강력한 완력으로 장애물을 부수며 돌진합니다.'
  }
];
