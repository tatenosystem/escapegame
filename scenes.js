var scenes = {
    '_assets': ['room1.jpg', 'key1.png'],
    'start': {
        'main': {
            'image': 'room1',
            'script': [
                [0, '', 'どうやら閉じ込められたみたいだ\n何も思い出せない...'],
                [0, '', 'なんとか脱出しないと...'],
            ]
        },
        'key': {
            'image': 'key1',
            'position': [10, 500, 80, 80],
            'script': [
                [0, '', 'おや？'],
                [0, '', '鍵が落ちている\n拾っておこう'],
                [0, 'IMAGE_HIDE'],
                [0, 'FLAG_ON', 10],
            ]
        },
        'door': {
            'position': [40, 73, 230, 400],
            'script': [
                [0, '', '扉だ。開かない'],
                [0, '', '頑丈な扉だ']
            ]
        },
    }
};
