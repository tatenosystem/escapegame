var scenes = {
    '_assets': ['room2.jpg', 'char1.png'],
    'start': {
        'main': {
            'image': 'room2',
            'script': [
                [0, '', 'おい！\nどうやら閉じ込められたみたいだぞ。\n基地全体が"緊急ロックモード"に入ったようだ'],
            ]
        },
        'char1': {
            'image': 'char1',
            'position': [350, 0, 380, 600],
            'script': [
                [0, '', '俺は司令室の方を見てくる。\n君は扉が開かないか試してくれ'],
                [0, 'IMAGE_HIDE'],
            ]
        },
    }
};
