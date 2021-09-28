namespace GoSouthRule {
    //============================================================================================
    //测试变量区
    //============================================================================================
    let loopCount = 0
    // 除了名字不同外， let与var的写法一致。

    //============================================================================================
    //牌区
    //============================================================================================
    //牌组成 0x0F(点数) + 0xF0(花色) 组成
    export const CardGroup = [
        //3,4,5,6,7,8,9,10,J,Q,K,A,2 (点数2对应的是最后一列)
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, // 黑桃
        0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, // 梅花
        0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B, 0x4C, 0x4D, // 方块
        0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x8B, 0x8C, 0x8D, // 红桃
    ]

    // 定义一个命名空间：namespace+空间名+{...}
    // 需要在命名空间外访问的标识符需要使用export
    // 访问方法：空间名+点+要访问的标识符

    //值掩码
    const ValueMask = 0xF
    // const 声明是声明变量的另一种方式。与let声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与 let相同的作用域规则，但是不能对它们重新赋值。
    //扑克种类
    export enum CardKind {
	    // enum使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript支持数字的和基于字符串的枚举。
	    // 枚举里的key和value是相互关联等效转化的，取哪个值都相当与取另外一个
        /**
         * 单
         */
        single = 0,
        /**
         * 双
         */
        pair = 1,
        /**
         * 三张
         */
        triplet = 2,
        /**
         * 四张
         */
        quadruplets = 3,
        /**
         * 顺子
         */
        seq = 4,
        /**
         * 三连对
         */
        seq3pair = 5,
        /**
         * 四连对
         */
        seq4pair = 6,

        /**
         * 错误种类
         */
        none = -1,
    }
    //扑克种类挑选
    type CardKindPick = {
	    // type 是类型定义
	    // 定义了一种类型，这个类型是一种对象
        /**
         * 单
         */
        [CardKind.single]:number[][],
	    //对象的属性都是字符串，不过属性对应的值可以是任意数据类型
	    //就是属性'[0]'的值是元素为number类型的二维数组
	    //相当于0:number[][] ？？？
        /**
         * 双
         */
        [CardKind.pair]:number[][],
        /**
         * 三张
         */
        [CardKind.triplet]:number[][],
        /**
         * 四张
         */
        [CardKind.quadruplets]:number[][],
        /**
         * 顺子
         */
        [CardKind.seq]:number[][],
        /**
         * 三连对
         */
        [CardKind.seq3pair]:number[][],
        /**
         * 四连对
         */
        [CardKind.seq4pair]:number[][],

    }

    //花色
    export const enum CardColor {
        /**
         * 黑桃
         */
        spade = 0x10,
        /**
         * 梅花
         */
        club = 0x20,
        /**
         * 方块
         */
        diamond = 0x40,
        /**
         * 红桃
         */
        heart = 0x80,

        /**
         * 掩码
         */
        mask = spade | club | diamond | heart
	// mask是什么？？？

    }
    //完美牌类型(自动胜)
    enum PerfectType{
        neno=0,                 //没有
		// neno 是什么完美类型？？？
        pair6=1,                //6对
        oneGroupQuadruplets2=2, //1组4张2
        fiveSeqPair=3,          //5连对
        sameColor12=4,          //12张同色
        twoQuadruplets=5,       //2组4张
	// two 是不是 two？？？
        fourTriplet=6,          //4组3张
        sixSeqPair=7,           //6连对
        twelveSeq=8,                  //12连张 龙顺
    }
    const PerfectZH_CN:string[] = ["没有", "6对", "1组4张2", "5连对", "12张同色", "2组4张", "4组3张", "6连对", "龙顺"]
    //牌组合信息
    //指定数组只能存储字符串
    export type CardCombineInfo = {
        value:number,               //点数
        colorMask:number,           //花色掩码
        count:number,               //数量
    }

    //牌识别信息
    export type CardIdentifyInfo = {
        value:number,               //点数
        colorMask:number,           //花色掩码
        count:number,               //数量
    }

    //============================================================================================
    //导出部分
    //============================================================================================
    //--------------------------------------------------------------------------------------------
    //日志部分
    //--------------------------------------------------------------------------------------------
    export function log(...data:any[]){
	    //any代表任意类型
	    //...代表可变参数个数
	    //data代表任意个数组，每个数组里的元素是任意类型？？？
        console.log(...data)
	//打印消息到网页控制台
    }
    
    export function error(...data:any[]){
        // console.error(...data)
        console.trace(...data)
	//打印栈追踪到网页控制台
        
    }
    
    //--------------------------------------------------------------------------------------------
    //扑克部分
    //--------------------------------------------------------------------------------------------
    export function getValue(card:number):number{
	    //函数的返回值类型为number
        return card & ValueMask
	//AND位运算
    }

    //牌值转索引
    export function cardValueConvertIndex(cardValue:number):number{
        return cardValue-1
    }

    //获取花色
    export function getColor(card:number):number{
        return card & CardColor.mask
    }

    //牌检查
    export function checkCard(card:number):boolean{
        let value = getValue(card)
        if(value<1 || value >0xD){
		//0xD是13
            return false
        }

        let color = getColor(card)
        if(color == 0){
		//颜色掩码全是1，只有全0才可能导致color为0，即没有花色，那这牌当然是错误的
            return false
        }

        return true
    }

    //制造牌组合信息(完整的组合信息)
    export function makeCardCombineInfo(cards:number[]):CardCombineInfo[]{
        let cardsCInfo:CardCombineInfo[] = [] //置空
        for(let i=0; i<13; ++i){
            cardsCInfo.push({ value: i+1, colorMask:0, count:0 })
	    //构造对象，把多个对象组合成数组
        }
        for(let i=0; i < cards.length; ++i){
            if(checkCard(cards[i])){
                let index:number = cardValueConvertIndex(getValue(cards[i]))
                if (index >= 0 && index < cardsCInfo.length) {
                    cardsCInfo[index].colorMask |= getColor(cards[i]); 
					//OR位运算
					//相同点数但不同花色的，会把不同花色也记录到bit里，如何把多个不同花色过滤出来呢？？？
			//使数组的索引值与卡牌的点数相等，并且是按顺序的
                    cardsCInfo[index].count += 1;
                }
                else {
                    error("makeCardCombineInfo:[%d]牌值错误", cards[i]);
                }
            }
            else{
                error("makeCardCombineInfo:[%d]牌值错误", cards[i])
            }
        }
        
        return cardsCInfo
    }

    //制造牌识别信息(只保留存在的信息)
    export function makeCardIdentifyInfo(cards:number[]):CardIdentifyInfo[]{
        let cardsCInfo:CardIdentifyInfo[] = makeCardCombineInfo(cards)
	    //两个名字不同的对象，但结构相同，可以赋值？？？
        let cii:CardIdentifyInfo[] = []
        for(let i = 0; i < cardsCInfo.length; ++i){
            if(cardsCInfo[i].count > 0){
                cii.push(cardsCInfo[i])
		    //只保留存在的牌的信息
            }
        }
        
        return cii
    }

    //获取单组牌识别信息
    export function getOneCardIdentifyInfo(cards:number[]):CardIdentifyInfo{
	    let cardIInfos:CardIdentifyInfo[] = makeCardIdentifyInfo(cards)
	    return cardIInfos[cardIInfos.length-1]
	    // 获取某一个点数的所有牌的信息？？？
	    // 获取最后一个存在的点数的牌
    }
    //--------------------------------------------------------------------------------------------
    //辅助
    //--------------------------------------------------------------------------------------------
    /**
     * 取颜色值
     * @param color 颜色值
     */
    function fetchColor(color:number):{color:number, oneColor:number}{
	    //多个返回值用{}括起来，就是返回对象？？？
	    //这里传入的color是CardIdentifyInfo.colorMask,而且必须是有至少存有两个花色的
        let oneColorMask = [CardColor.spade, CardColor.club, CardColor.diamond, CardColor.heart]
        for(let i=0; i<oneColorMask.length; ++i){
            if(color&oneColorMask[i]){
		    //false代表bit全是0，true代表有一个bit为1即匹配了oneColorMask[i]这一个花色
                return {
                    color:color & ~oneColorMask[i], 
			//取反使匹配上的花色的bit由1变为0，再跟原color相与，使得原color中的匹配上的花色的bit也由1变为0即不存在了，相当于取出
                    oneColor:oneColorMask[i]//这个就是取出的花色
			//返回多个返回值用{}括起来，返回对象？？？
                }
            }
        }
        error("取色错误:%d", color)
        return {color:color, oneColor:-1}
    }

    /**
     * 合成牌
     * @param value 点数
     * @param color 颜色
     * @returns 牌
     */
    function mergeCard(value:number, color:number):number{
        return value|color
	    //value只占8个bits中的右边4个bits
	    //color只占8个bits中的左边4个bits
    }

    /**
     * 挑选牌
     * @param cardsCInfo 牌信息
     * @returns 挑选后的牌
     */
    export function makeKindPick(cardsCInfo:CardCombineInfo[]):CardKindPick{
        let pickExec = [
            {kind:CardKind.seq4pair,exec:fetchSeq4pair}, 
            {kind:CardKind.seq3pair, exec:fetchSeq3pair}, 
            {kind:CardKind.quadruplets, exec:fetchQuadruplets}, 
            {kind:CardKind.triplet, exec:fetchTriplet}, 
            {kind:CardKind.seq, exec:fetchSeq}, 
            {kind:CardKind.pair, exec:fetchPair}, 
            {kind:CardKind.single, exec:fetchSingle}
        ]
        let ckp = {}
        for(let i = 0; i < pickExec.length; ++i){
            let {kind, exec} = pickExec[i]
            ckp[<any>kind] = exec(cardsCInfo)
		//<any>kind表示kind可以自动转变成任意类型
		//ckp[xxx]是访问ckp对象的xxx属性
        }

        return <CardKindPick>ckp
    }

    /**
     * 提示牌
     * @param cardsCInfo 牌信息
     * @returns 提示组合
     */
    export function tips(outCards:number[], cards:number[]){
	    //获取牌类型
	    //参数cards是用户本身所持有的牌组，参数outCards是上一家出的牌组？？？
	    let kind:CardKind = getCardKind(outCards)
	    let cardsIInfo:CardIdentifyInfo = getOneCardIdentifyInfo(outCards)
	    let getSingleExecs = (value:number)=>{
		    if(value == 0xD){
			    return [fetchSeq4pair, fetchQuadruplets, fetchSeq3pair, fetchSingle]
		    }
		    return [fetchSingle]
	    }
	    //'getSingleExecs ='后面是一个函数，(value:number)是要输入的参数，=>后面是函数体，所以getSingleExecs是一个函数
	    let getPairleExecs = (value:number)=>{
		    if(value == 0xD){
			    return [fetchSeq4pair, fetchQuadruplets, fetchPair]
		    }
		    return [fetchPair]
	    }
	    let pickExec = {
		    [CardKind.seq4pair]:[fetchSeq4pair], 
		    [CardKind.seq3pair]:[fetchSeq3pair], 
		    [CardKind.quadruplets]:[fetchSeq4pair,fetchQuadruplets], 
		    [CardKind.triplet]:[fetchSeq4pair,fetchTriplet], 
		    //获取到这个属性的值因为是一个数组，所以会获取到数组
		    [CardKind.seq]:[fetchSeq], 
		    [CardKind.pair]:getPairleExecs(cardsIInfo.value), 
		    [CardKind.single]:getSingleExecs(cardsIInfo.value)
		    //获取到这个属性的值因为是函数且配有传参，所以函数直接执行
	    }
	    let execs = pickExec[kind]
	    //根据上家出的牌组的种类，去搜索所有可以打出的牌组

        let tipsCards:number[][] = []
	    //提取
        let cardsCInfo:CardCombineInfo[] = makeCardCombineInfo(cards)
	    for(let i=0; i < execs.length; ++i){
            //通过克隆产生多种牌型组合，以免被组成别的牌，而导致不能和别的牌组合
            let cloneCardCInfo = JSON.parse(JSON.stringify(cardsCInfo))
            let assembly:number[][] = execs[i](cloneCardCInfo)
            for(let j=0; j < assembly.length; ++j){
                let testInfo:string[] = []
                for(let t = 0; t < assembly[j].length; ++t){
                    testInfo.push(getCardSymbol(assembly[j][t]))
			//把一张牌的“点数&花色”叫做“牌值”，这里把每一张牌的“牌值”给放进一维数组testInfo里
                }
                //判断是否能压
                if(isBetter(outCards, assembly[j])){
                   tipsCards.push(assembly[j]) 
		//判断是否大过用户自己选的牌组,是的话加入提示牌组里
                }
            }

	    }
        return tipsCards

    }

    /**
     * 完美牌(自动胜)
     * @param cardsCInfo 牌信息
     * @returns 类型
     */
    export function isPerfectCards(cardsCInfo:CardCombineInfo[]):PerfectType{
        let checks = [
            [PerfectType.twelveSeq, isPerfectTwelveSeq],
            [PerfectType.sixSeqPair, isPerfectSixSeqPair],
            [PerfectType.fourTriplet, isPerfectFourTriplet],
            [PerfectType.twoQuadruplets, isPerfectTowQuadruplets],
            [PerfectType.sameColor12, isPerfectSameColor12],
            [PerfectType.fiveSeqPair, isPerfectFiveSeqPair],
            [PerfectType.oneGroupQuadruplets2, isPerfectOneGroupQuadruplets2],
            [PerfectType.pair6, isPerfectPair6]
        ]
        for(let i = 0; i < checks.length; ++i){
            let type = checks[i][0]
            let is:(cardsCInfo:CardCombineInfo[])=>boolean= <any>checks[i][1]
		//'=>'用来表示函数定义，它的左边是输入类型，需要用括号括起来，右边是输出类型
		//所以，'(cardsCInfo:CardCombineInfo[])=>boolean'是is的类型，这个类型是个函数，所以is是个函数
		//所以，is代表'<any>checks[i][1]'这个函数，该函数的输入类型为cardsCInfo:CardCombineInfo，该函数的输出类型为boolean
            if(is(cardsCInfo)){
                return <PerfectType>type
            }
        }
        return PerfectType.neno
    }

    //6对
    function isPerfectPair6(cardsCInfo:CardCombineInfo[]):boolean{
        let pairCount = 0
        for(let i=0; i<cardsCInfo.length; ++i){
            if(cardsCInfo[i].count >= 2){
                pairCount += parseInt(String(cardsCInfo[i].count/2))
            }
        }
        return pairCount == 6
    }                
    //1组4张2
    function isPerfectOneGroupQuadruplets2(cardsCInfo:CardCombineInfo[]):boolean{
        let card2:CardCombineInfo = cardsCInfo[cardsCInfo.length-1]
	    //CardCombineInfo里的牌值是排序了的，排在最后的是'2'
        if(card2.value != 0xD){
            error("isPerfectOneGroupQuadruplets2:%s", "传入参数不对")
        }
        return card2.count == 4
    }
    //5连对
    function isPerfectFiveSeqPair(cardsCInfo:CardCombineInfo[]):boolean{
        let fiveSeqPair:CardCombineInfo[] = []
        //按正常顺序扫描
        let push = function(card:CardCombineInfo){
            if(card.count >= 2){
                fiveSeqPair.push(card)
            }
            else{
                fiveSeqPair = []
            }
        }
        for(let i = 0; i < cardsCInfo.length; ++i){
            push(cardsCInfo[i])
        }
        if(fiveSeqPair.length == 5){
            return true
        }
        //从A,2开始扫描,倒数二，倒数一索引
        fiveSeqPair = []
        let scanIndex:number[] = [cardsCInfo.length-2, cardsCInfo.length-1]
        for(let i = 0; i < scanIndex.length; ++i){
            push(cardsCInfo[scanIndex[i]])
        }
        if(fiveSeqPair.length==0){
            return false
        }
        //扫剩下的
        for(let i = 0; i < 5-fiveSeqPair.length; ++i){
            push(cardsCInfo[i])
        }
	    //5连对可以打A，2，3，4，5，所以要扫两次

        return fiveSeqPair.length == 5
    }
    //12张同色
    function isPerfectSameColor12(cardsCInfo:CardCombineInfo[]):boolean{
        let colorCountInfo = {
            [CardColor.spade]:0,
            [CardColor.club]:0,
            [CardColor.diamond]:0,
            [CardColor.heart]:0
        }
        let fetch = function(color:CardColor){
		//color是至少有一种花色的，也可以是有多种花色相或
		//CardColor是枚举，作为参数类型表示该参数可以是具体枚举实例中的一个或多个组合
            let count = 0
            let cloneColor = color
            while(cloneColor > 0 && count <= 14){
		    //一个用户最多牌数是13张，但别人可能传错牌数即超过13张，所以这里的14是防止别人传错牌的数量，并且在后面报错
                let colorInfo = fetchColor(cloneColor)
                if(colorCountInfo[colorInfo.oneColor]!=undefined){
			//如果一个对象的属性是之前不存在的，则取该属性的值会显示undefined
                    colorCountInfo[colorInfo.oneColor] += 1
                }
                else{
                    error("isPerfectSameColor12:%s", "提取了错误的颜色", colorInfo)
                }
                cloneColor = colorInfo.color
                count += 1
            }
            if(count >= 14){
                error("isPerfectSameColor:%s", "超出正常颜色范围", color)
            }
        }

        for(let i = 0; i < cardsCInfo.length; ++i){
            fetch(cardsCInfo[i].colorMask)
        }
        return  colorCountInfo[CardColor.spade] == 12 || 
                colorCountInfo[CardColor.club] == 12 || 
                colorCountInfo[CardColor.diamond] == 12 ||
                colorCountInfo[CardColor.heart] == 12
    }
    
    //2组4张
    function isPerfectTowQuadruplets(cardsCInfo:CardCombineInfo[]):boolean{
        let quadruplets:CardCombineInfo[] = []
        let push = function(card:CardCombineInfo){
            if(card.count == 4){
                quadruplets.push(card)
            }
        }
        for(let i = 0; i < cardsCInfo.length; ++i){
            push(cardsCInfo[i])
        }
        return quadruplets.length >= 2
    }

    //4组3张
    function isPerfectFourTriplet(cardsCInfo:CardCombineInfo[]):boolean{
        let triplet:CardCombineInfo[] = []
        let push = function(card:CardCombineInfo){
            if(card.count >= 3){
                triplet.push(card)
            }
        }
        for(let i = 0; i < cardsCInfo.length; ++i){
            push(cardsCInfo[i])
        }
        return triplet.length >= 4
    }
         
    //6连对
    function isPerfectSixSeqPair(cardsCInfo:CardCombineInfo[]):boolean{
        let sixSeqPair:CardCombineInfo[] = []
        //按正常顺序扫描
        let push = function(card:CardCombineInfo){
            if(card.count >= 2){
                sixSeqPair.push(card)
            }
            else{
                sixSeqPair = []
            }
        }
        for(let i = 0; i < cardsCInfo.length; ++i){
            push(cardsCInfo[i])
        }
        if(sixSeqPair.length == 6){
            return true
        }
        //从A,2开始扫描,倒数二，倒数一索引
        sixSeqPair = []
        let scanIndex:number[] = [cardsCInfo.length-2, cardsCInfo.length-1]
        for(let i = 0; i < scanIndex.length; ++i){
            push(cardsCInfo[scanIndex[i]])
        }
        if(sixSeqPair.length==0){
            return false
        }
        //扫剩下的
        for(let i = 0; i < 6-sixSeqPair.length; ++i){
            push(cardsCInfo[i])
        }

        return sixSeqPair.length == 6
    }

    //12连张 龙顺
    function isPerfectTwelveSeq(cardsCInfo:CardCombineInfo[]):boolean{
        let seq:CardCombineInfo[] = []
        //按正常顺序扫描
        let push = function(card:CardCombineInfo){
            if(card.count >= 1){
                seq.push(card)
            }
            else{
                seq = []
            }
        }
        for(let i = 0; i < cardsCInfo.length; ++i){
            push(cardsCInfo[i])
        }
        return seq.length == 12
    }
                  
    /**
     * 取单
     */
    export function fetchSingle(cardsCInfo:CardCombineInfo[]):number[][]{
        if(cardsCInfo.length == 0){
            return []
        }

        let cards:number[][] = []
        for(let i = 0; i < cardsCInfo.length; ++i){
            if(cardsCInfo[i].count > 0){
                let count = cardsCInfo[i].count
                for(let c=0; c<count; ++c){
                    let {color, oneColor} = fetchColor(cardsCInfo[i].colorMask)
                    cardsCInfo[i].colorMask = color
                    cardsCInfo[i].count -= 1
                    cards.push([mergeCard(cardsCInfo[i].value, oneColor)])
                }
                
            }
        }
	    //把每一张牌都选出来
        return cards
    }
    /**
     * 双
     */
    export function fetchPair(cardsCInfo:CardCombineInfo[]):number[][]{
        if(cardsCInfo.length == 0){
            return []
        }

        let cards:number[][] = []
        for(let i = 0; i < cardsCInfo.length; ++i){
            if(cardsCInfo[i].count >= 2){
                let count = cardsCInfo[i].count
                for(let c=0; c<count; c+=2){
                    let one:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                    cardsCInfo[i].colorMask = one.color
                    let two:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                    cardsCInfo[i].colorMask = one.color
                    cardsCInfo[i].count -= 2
                    cards.push([mergeCard(cardsCInfo[i].value, one.oneColor), mergeCard(cardsCInfo[i].value, two.oneColor)])
                    //不足2张
                    if(cardsCInfo[i].count < 2){
                        break
                    }
                }
                
            }
        }
	    //把对子都选出来
        return cards
    }
    /**
     * 三张
     */
    export function fetchTriplet(cardsCInfo:CardCombineInfo[]):number[][]{
        if(cardsCInfo.length == 0){
            return []
        }

        let cards:number[][] = []
        for(let i = 0; i < cardsCInfo.length; ++i){
            if(cardsCInfo[i].count >= 3){
                let one:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                cardsCInfo[i].colorMask = one.color
                let two:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                cardsCInfo[i].colorMask = two.color
                let three:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                cardsCInfo[i].colorMask = three.color
                cardsCInfo[i].count -= 3
                cards.push([
                    mergeCard(cardsCInfo[i].value, one.oneColor), 
                    mergeCard(cardsCInfo[i].value, two.oneColor),
                    mergeCard(cardsCInfo[i].value, three.oneColor)
                ])
                
            }
        }
	    //把三张相同的都选出来
        return cards
    }
    /**
     * 四张
     */
    export function fetchQuadruplets(cardsCInfo:CardCombineInfo[]):number[][]{
        if(cardsCInfo.length == 0){
            return []
        }

        let cards:number[][] = []
        for(let i = 0; i < cardsCInfo.length; ++i){
            if(cardsCInfo[i].count == 4){
                let one:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                cardsCInfo[i].colorMask = one.color
                let two:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                cardsCInfo[i].colorMask = two.color
                let three:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                cardsCInfo[i].colorMask = three.color
                let four:{color:number, oneColor:number} = fetchColor(cardsCInfo[i].colorMask)
                cardsCInfo[i].colorMask = four.color
                cardsCInfo[i].count -= 4
                cards.push([
                    mergeCard(cardsCInfo[i].value, one.oneColor), 
                    mergeCard(cardsCInfo[i].value, two.oneColor),
                    mergeCard(cardsCInfo[i].value, three.oneColor),
                    mergeCard(cardsCInfo[i].value, four.oneColor)
                ])//组成数组中的数组
                
            }
        }
	    //把四张相同的都选出来
        return cards
    }
    /**
     * 顺子
     */
    export function fetchSeq(cardsCInfo:CardCombineInfo[]):number[][]{
        if(cardsCInfo.length == 0){
            return []
        }

        let cards:number[][] = []
        //顺子
        let seqIndex:number[] = []
        let lastValue = cardsCInfo[0].value-1
        let fetchCards = function(indexs:number[]){
            // log('-------------fetchCards---------------')
            // log(indexs)
            // log('--------------------------------------')

            let s:number[] = []
            for(let i=0; i<indexs.length; ++i){
                let index = indexs[i]
                if(cardsCInfo[index].count > 0){
                    let {color, oneColor} = fetchColor(cardsCInfo[index].colorMask)
                    cardsCInfo[index].colorMask = color
                    cardsCInfo[index].count -= 1
                    s.push(mergeCard(cardsCInfo[index].value, oneColor))
                }
            }
            cards.push(s)

        }

        for(let i = 0; i < cardsCInfo.length; ++i){
            //连续中断
            if(lastValue+1 != cardsCInfo[i].value || cardsCInfo[i].count == 0){
		    //连续的点数中断才去取顺子
                if(seqIndex.length >= 3){
			//至少三张连续的牌才是顺子
                    fetchCards(seqIndex)
                }

                seqIndex = []
            }

            lastValue = cardsCInfo[i].value
            if (cardsCInfo[i].count > 0) {
                seqIndex.push(i)
            }
            else{
                seqIndex = []
		    //保证了放到seqIndex里的索引要么为空，要么连续
            }
        }
        return cards
    }
    /**
     * 三连对
     */
    export function fetchSeq3pair(cardsCInfo:CardCombineInfo[]):number[][]{
        if(cardsCInfo.length == 0){
            return []
        }

        let cards:number[][] = []
        //三连对
        let seqIndex:number[] = []
        let lastValue = cardsCInfo[0].value-1
        let fetchCards = function(indexs:number[]){
            // log('-------------fetchCards---------------')
            // log(indexs)
            // log('--------------------------------------')

            let s:number[] = []
            for(let i=0; i<indexs.length; ++i){
                let index = indexs[i]
                if(cardsCInfo[index].count >= 2){
                    let one:{color:number, oneColor:number} = fetchColor(cardsCInfo[index].colorMask)
                    cardsCInfo[index].colorMask = one.color
                    cardsCInfo[index].count -= 1
                    let two:{color:number, oneColor:number} = fetchColor(cardsCInfo[index].colorMask)
                    cardsCInfo[index].colorMask = two.color
                    cardsCInfo[index].count -= 1
                    s.push(mergeCard(cardsCInfo[index].value, one.oneColor))
                    s.push(mergeCard(cardsCInfo[index].value, two.oneColor))
                }
            }
            cards.push(s)

        }

        for(let i = 0; i < cardsCInfo.length; ++i){
            //连续中断
            if(lastValue+1 != cardsCInfo[i].value || cardsCInfo[i].count == 0){
                if(seqIndex.length == 3){
                    fetchCards(seqIndex)
                }

                seqIndex = []
            }

            lastValue = cardsCInfo[i].value
            if (cardsCInfo[i].count >= 2) {
                seqIndex.push(i)
            }
            else{
                seqIndex = []
            }
        }
        return cards
    }
    /**
     * 四连对
     */
    export function fetchSeq4pair(cardsCInfo:CardCombineInfo[]):number[][]{
        if(cardsCInfo.length == 0){
            return []
        }

        let cards:number[][] = []
        //四连对
        let seqIndex:number[] = []
        let lastValue = cardsCInfo[0].value-1
        let fetchCards = function(indexs:number[]){
            // log('-------------fetchCards---------------')
            // log(indexs)
            // log('--------------------------------------')

            let s:number[] = []
            for(let i=0; i<indexs.length; ++i){
                let index = indexs[i]
                if(cardsCInfo[index].count >= 2){
                    let one:{color:number, oneColor:number} = fetchColor(cardsCInfo[index].colorMask)
                    cardsCInfo[index].colorMask = one.color
                    cardsCInfo[index].count -= 1
                    let two:{color:number, oneColor:number} = fetchColor(cardsCInfo[index].colorMask)
                    cardsCInfo[index].colorMask = two.color
                    cardsCInfo[index].count -= 1
                    s.push(mergeCard(cardsCInfo[index].value, one.oneColor))
                    s.push(mergeCard(cardsCInfo[index].value, two.oneColor))
                }
            }
            cards.push(s)

        }

        for(let i = 0; i < cardsCInfo.length; ++i){
            //连续中断
            if(lastValue+1 != cardsCInfo[i].value || cardsCInfo[i].count == 0){
                if(seqIndex.length == 4){
                    fetchCards(seqIndex)
                }

                seqIndex = []
            }

            lastValue = cardsCInfo[i].value
            if (cardsCInfo[i].count >= 2) {
                seqIndex.push(i)
            }
            else{
                seqIndex = []
            }
        }
        return cards
    }

    /**
     * 获取牌种类
     * @param cards 牌组
     * @returns 种类
     */
    export function getCardKind(cards:number[]):CardKind{
	    //这里的cards是能组成某种牌种类的组成
        let ck:CardKind = CardKind.none
        let isCardKinds = [
            {is:isQuadruplets, kind:CardKind.quadruplets},
            {is:isSeq4pair, kind:CardKind.seq4pair}, 
            {is:isSeq3pair, kind:CardKind.seq3pair}, 
            {is:isSeq, kind:CardKind.seq}, 
            {is:isTriplet, kind:CardKind.triplet}, 
            {is:isPair, kind:CardKind.pair}, 
            {is:isSingle, kind:CardKind.single}
        ]
        let cardsCInfo:CardIdentifyInfo[] = makeCardIdentifyInfo(cards)
        for(let i = 0; i < isCardKinds.length; ++i){
            let {is, kind} = isCardKinds[i]
            if(is(cardsCInfo)){
                ck = kind
                break
            }
        }


        return ck
    }
    
    //============================================================================================
    //压牌区
    //============================================================================================

    /**
     * 是否能压
     * @param aCards A的牌
     * @param bCards B的牌
     * @returns B是能打能A
     */
    export function isBetter(aCards:number[], bCards:number[]):boolean{
        let aKind:CardKind = getCardKind(aCards)
        let bKind:CardKind = getCardKind(bCards)
        let betterJudge:{} = {
            [CardKind.none]:function(a:CardIdentifyInfo, b:CardIdentifyInfo){
                error("isBetter:", a, b)
            },
            [CardKind.single]:isBetterSingle,
            [CardKind.pair]:isBetterPair,
            [CardKind.triplet]:isBetterTriplet,
            [CardKind.quadruplets]:isBetterQuadruplets,
            [CardKind.seq]:isBetterSeq,
            [CardKind.seq3pair]:isBetterSeq3pair,
            [CardKind.seq4pair]:isBetterSeq4pair,
        }

        let a:CardIdentifyInfo[] = makeCardIdentifyInfo(aCards)
        let b:CardIdentifyInfo[] = makeCardIdentifyInfo(bCards)
        
        if(aKind == bKind){
            return betterJudge[aKind](a, b)
        }
        //跨牌型处理 单2 和对2 3连对 4张 4连对允许跨牌型
        else if(
                ((aKind == CardKind.single || aKind == CardKind.pair) && a[0].value == 0xD) ||
                aKind == CardKind.seq3pair ||
                aKind == CardKind.quadruplets ||
                aKind == CardKind.seq4pair
        ){
            let allowCrossKind:{} = {
                [CardKind.single]:{
                    [CardKind.seq3pair]:true,
                    [CardKind.quadruplets]:true,
                    [CardKind.seq4pair]:true,
                },
                [CardKind.pair]:{
                    [CardKind.quadruplets]:true,
                    [CardKind.seq4pair]:true,
                },
                [CardKind.seq3pair]:{
                    [CardKind.quadruplets]:true,
                    [CardKind.seq4pair]:true,
                },
                [CardKind.quadruplets]:{
                    [CardKind.seq4pair]:true,
                },

            }
            if(allowCrossKind[aKind][bKind]){
                return true
            }

        }

        return false
    }

    //--------------------------------------------------------------------------------------------
    //调用以下接口需先验证类型正确,不再做重复检测
    //--------------------------------------------------------------------------------------------
    /**
     * 压牌比较
     * @param a 牌识别信息
     * @param b 牌识别信息
     * @returns 是否能压
     */
    function betterCompete(a:CardIdentifyInfo, b:CardIdentifyInfo):boolean{
        if(b.value != a.value){
            return b.value > a.value
        }

        return b.colorMask > a.colorMask
    }
    /**
     * 单张压牌 b是否能压a
     * @param aCardsCInfo a识别信息
     * @param bCardsCInfo b识别信息
     * @returns b是否能压a
     */
    function isBetterSingle(aCardsCInfo:CardIdentifyInfo[], bCardsCInfo:CardIdentifyInfo[]):boolean{
        if(aCardsCInfo.length != 1 || bCardsCInfo.length != 1){
            return false
        }
        return betterCompete(aCardsCInfo[0], bCardsCInfo[0])
    }
    /**
     * 对子压牌 b是否能压a
     * @param aCardsCInfo a识别信息
     * @param bCardsCInfo b识别信息
     * @returns b是否能压a
     */
    function isBetterPair(aCardsCInfo:CardIdentifyInfo[], bCardsCInfo:CardIdentifyInfo[]):boolean{
        if(aCardsCInfo.length != 1 || bCardsCInfo.length != 1){
            return false
        }
        return betterCompete(aCardsCInfo[0], bCardsCInfo[0])
    }
    /**
     * 三张压牌 b是否能压a
     * @param aCardsCInfo a识别信息
     * @param bCardsCInfo b识别信息
     * @returns b是否能压a
     */
    function isBetterTriplet(aCardsCInfo:CardIdentifyInfo[], bCardsCInfo:CardIdentifyInfo[]):boolean{
        if(aCardsCInfo.length != 1 || bCardsCInfo.length != 1){
            return false
        }
        return betterCompete(aCardsCInfo[0], bCardsCInfo[0])
    }
    /**
     * 四张压牌 b是否能压a
     * @param aCardsCInfo a识别信息
     * @param bCardsCInfo b识别信息
     * @returns b是否能压a
     */
    function isBetterQuadruplets(aCardsCInfo:CardIdentifyInfo[], bCardsCInfo:CardIdentifyInfo[]):boolean{
        if(aCardsCInfo.length != 1 || bCardsCInfo.length != 1){
            return false
        }
        return betterCompete(aCardsCInfo[0], bCardsCInfo[0])
    }
    /**
     * 顺子压牌 b是否能压a
     * @param aCardsCInfo a识别信息
     * @param bCardsCInfo b识别信息
     * @returns b是否能压a
     */
    function isBetterSeq(aCardsCInfo:CardIdentifyInfo[], bCardsCInfo:CardIdentifyInfo[]):boolean{
        if(aCardsCInfo.length < 3 || bCardsCInfo.length < 3 || aCardsCInfo.length != bCardsCInfo.length){
            return false
        }
        let index:number = aCardsCInfo.length -1
        return betterCompete(aCardsCInfo[index], bCardsCInfo[index])
	    //看最后一张牌的大小就能判断出两个顺子的大小了
    }
    /**
     * 三连对压牌 b是否能压a
     * @param aCardsCInfo a识别信息
     * @param bCardsCInfo b识别信息
     * @returns b是否能压a
     */
    function isBetterSeq3pair(aCardsCInfo:CardIdentifyInfo[], bCardsCInfo:CardIdentifyInfo[]):boolean{
        if(aCardsCInfo.length != 3 || bCardsCInfo.length != 3){
            return false
        }
        let index:number = aCardsCInfo.length -1
        return betterCompete(aCardsCInfo[index], bCardsCInfo[index])
    }
    /**
     * 四连对压牌 b是否能压a
     * @param aCardsCInfo a识别信息
     * @param bCardsCInfo b识别信息
     * @returns b是否能压a
     */
    function isBetterSeq4pair(aCardsCInfo:CardIdentifyInfo[], bCardsCInfo:CardIdentifyInfo[]):boolean{
        if(aCardsCInfo.length != 4 || bCardsCInfo.length != 4){
            return false
        }
        let index:number = aCardsCInfo.length -1
        return betterCompete(aCardsCInfo[index], bCardsCInfo[index])
    }
    //--------------------------------------------------------------------------------------------
    //种类严查型
    //--------------------------------------------------------------------------------------------
    /**
     * 单
     */
    export function isSingle(cardsCInfo:CardIdentifyInfo[]):boolean{
        if(cardsCInfo.length != 1){
            return false
        }
        return true
    }
    /*
     * 双
     */
    export function isPair(cardsCInfo:CardIdentifyInfo[]):boolean{
        if(cardsCInfo.length != 1){
            return false
        }
        if(cardsCInfo[0].count != 2){
            return false
        }
        
        return true
    }
    /**
     * 三张
     */
    export function isTriplet(cardsCInfo:CardIdentifyInfo[]):boolean{
        if(cardsCInfo.length != 1){
            return false
        }
        if(cardsCInfo[0].count != 3){
            return false
        }
        return true
    }
    /**
     * 四张
     */
    export function isQuadruplets(cardsCInfo:CardIdentifyInfo[]):boolean{
        if(cardsCInfo.length != 1){
            return false
        }
        if(cardsCInfo[0].count != 4){
            return false
        }
        return true
    }
    /**
     * 顺子
     */
    export function isSeq(cardsCInfo:CardIdentifyInfo[]):boolean{
        if(cardsCInfo.length < 3){
            return false
        }
        let checkValue:number = cardsCInfo[0].value + 1
        for(let i=1; i<cardsCInfo.length; ++i){
            if(checkValue != cardsCInfo[i].value || cardsCInfo[i].count != 1){
		    //这里的顺子还必须是一个点数只有一张牌？？？
                return false
            }
            checkValue = checkValue + 1
        }
        return true
    }
    /**
     * 三连对
     */
    export function isSeq3pair(cardsCInfo:CardIdentifyInfo[]):boolean{
        if(cardsCInfo.length != 3){
            return false
        }

        let checkValue:number = cardsCInfo[0].value + 1
        for(let i=1; i<cardsCInfo.length; ++i){
            if(checkValue != cardsCInfo[i].value || cardsCInfo[i].count != 2){
                return false
            }
            checkValue = checkValue + 1
        }

        return true
    }
    /**
     * 四连对
     */
    export function isSeq4pair(cardsCInfo:CardIdentifyInfo[]):boolean{
        if(cardsCInfo.length != 4){
            return false
        }

        let checkValue:number = cardsCInfo[0].value + 1
        for(let i=1; i<cardsCInfo.length; ++i){
            if(checkValue != cardsCInfo[i].value || cardsCInfo[i].count != 2){
                return false
            }
            checkValue = checkValue + 1
        }
        return true
    }
    //--------------------------------------------------------------------------------------------
    //种类查询
    //--------------------------------------------------------------------------------------------
    //============================================================================================
    //内部
    //============================================================================================
    //============================================================================================
    //测试
    //============================================================================================
    /**
     * 产生一副新牌
     */
    function createNewCard():number[]{
        let newCard:number[] = []
        let count:number = CardGroup.length
        let cloneCardGroup:number[] = JSON.parse(JSON.stringify(CardGroup))
	    //为什么一定要通过json？？？
        for(let i=0; i<count; ++i){
            let r:number = randomNum(0, cloneCardGroup.length-1)
            newCard.push(cloneCardGroup.splice(r,1).pop())
        }

        return newCard
    }

    function randomNum(minNum: number, maxNum: number): number {
	    //typescript的函数不需要把签名里的所有参数都传入的
        switch (arguments.length) {
			//判断参数个数
            case 1:
                return parseInt(String(Math.random() * minNum + 1), 10);
            case 2:
                return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
            default:
                break;
        }
        return 0
    }
    /**
     * 获取花色符号
     * @param card 牌
     * @returns 符号
     */
    function getColorSymbol(card:number):string{
        let symbol:{}={}
        symbol[CardColor.spade] = "♠"
        symbol[CardColor.club] = "♣"
        symbol[CardColor.diamond] = "♦"
        symbol[CardColor.heart] = "♥"
        let color = getColor(card)
        if(symbol[color]){
            return symbol[color]
        }
        error("getColorSymbol:%d", card)
        return "error"

    }
    /**
     * 获取牌值符号
     * @param card 牌
     * @returns 符号
     */
    function getValueSymbol(card:number):string{
        let value = getValue(card) + 2
	    //牌的实际点数确实是getValue(card)+2
        if(value>10){
            let symbol = {
                '11':"J",
                '12':"Q",
                '13':"K",
                '14':"A",
                '15':"2",
		    //为什么一边单引号，另一边双引号？？？
            }
            if(symbol[value]){
                return symbol[value]
		    //symbol[12]可以取得Q吗？？？
            }
            error("getValueSysmbol:%d", card)
            return "error"
        }

        return String(value)
    }
    function getCardSymbol(card:number):string{
        return getColorSymbol(card) + getValueSymbol(card)
    }
    export function test(){
        log('------------------------开始测试------------------------')
        let newCard:number[] = createNewCard()
	    //newCard里有53张牌
        let symbol:string[] = []
        let users:number[][] = []
        for(let i=0; i<4; ++i){
            users.push(
                newCard.splice(0, 13)
		    //每个user分到13张牌
            )

            let cardSymbol:string = ""
            for(let card of users[i]){
		    //循环
                cardSymbol += getCardSymbol(card) + " "
            }
            symbol.push(cardSymbol)
        }
        // log(newCard)
        // log(symbol)
        // users[1] = [0x11, 0x12, 0x13, 0x21, 0x22, 0x23, 0x41, 0x42, 0x43]
        let userCardInfos:string[] = []
        users[1].forEach((value:number)=>{
            userCardInfos.push(getCardSymbol(value))
		//对数组里的每一个元素执行函数，且每个元素就是该函数的一个参数
        })
        log("user1:")
        log(userCardInfos)
        let cardCInfo:CardCombineInfo[] = makeCardCombineInfo(users[1])

        function numberConverText(cards:number[][]):string[][]{
		//第二维里的每一个元素都是一个卡牌值（包含花色和点数）
            let texts:string[][] = []
            for(let i in cards){
                let gorup:string[] = []
                for(let j in cards[i]){
                    gorup.push(getCardSymbol(cards[i][j]))
                }
                texts.push(gorup)
            }
            return texts
        }

        let testUnits = [
            ()=>{
                log("---------------------自动胜测试----------------")
                let pType:PerfectType = isPerfectCards(makeCardCombineInfo(users[1]))
                log(PerfectZH_CN[pType])
                log("------------------------------------------")
                return pType != PerfectType.neno
            },
            ()=>{
                log("---------------------提示测试----------------")
                let c = users[0][0]
                if((c&0xF)>0x9){
                    c =c & 0xF0 | 0x9
                }
                let outCards:number[] = [c,c+1,c+2, c+3]
                log(numberConverText([outCards]))
                let tipsCards = tips(outCards, users[1])
                let showInfo:string[][] = []
                for(let i = 0; i < tipsCards.length; ++i){
                    let symbolInfo:string[] = []
                    for(let j = 0; j < tipsCards[i].length; ++j){
                        symbolInfo.push(getCardSymbol(tipsCards[i][j]))
                    }
                    showInfo.push(symbolInfo)
                }
                log(showInfo)
                log("-----------------------------------------")

                return showInfo.length > 0 
            },
            ()=>{//单张压牌测试
                log("---------------------单张压牌测试----------------")
                let kindPickInfo = makeKindPick(cardCInfo)
                let showInfo = {}
                for(let i in kindPickInfo){
                    showInfo[CardKind[i]] = numberConverText(kindPickInfo[i])
                }
                log(showInfo)
                log("user0:[%s] < user1:[%s]", getCardSymbol(users[0][0]), getCardSymbol(users[1][0]))
                log(isBetter([users[0][0]], [users[1][0]]))
                log("-------------------------------------------")
                return true

            },
            ()=>{//四连对测试单元
                log("---------------------四连对测试----------------")
                // log(cardCInfo)
                let seqArr:number[][]= fetchSeq4pair(cardCInfo)
                let infos:string[][] = []
                let isTestInfo:boolean[] = []
                let kindInfos:CardKind[] = []
                for (let i = 0; i < seqArr.length; ++i) {
                    let sInfo = []
                    for (let j = 0; j < seqArr[i].length; ++j) {
                        sInfo.push( 
                            getCardSymbol(seqArr[i][j])
                        )
                    }
                    infos.push(sInfo)
                    isTestInfo.push(
                        isSeq4pair(makeCardIdentifyInfo(seqArr[i]))
                    )
                    kindInfos.push(
                        CardKind[String(getCardKind(seqArr[i]))]
			    //把枚举转成字符串？？？
                    )
                }
                log(infos)
                log(isTestInfo)
                log(kindInfos)
                log("-----------------------------------------")
                return seqArr.length > 0
            },
            ()=>{//三连对测试单元
                log("---------------------三连对测试----------------")
                // log(cardCInfo)
                let seqArr:number[][]= fetchSeq3pair(cardCInfo)
                let infos:string[][] = []
                let isTestInfo:boolean[] = []
                let kindInfos:CardKind[] = []
                for (let i = 0; i < seqArr.length; ++i) {
                    let sInfo = []
                    for (let j = 0; j < seqArr[i].length; ++j) {
                        sInfo.push( 
                            getCardSymbol(seqArr[i][j])
                        )
                    }
                    infos.push(sInfo)
                    isTestInfo.push(
                        isSeq3pair(makeCardIdentifyInfo(seqArr[i]))
                    )
                    kindInfos.push(
                        CardKind[String(getCardKind(seqArr[i]))]
                    )
                }
                log(infos)
                log(isTestInfo)
                log(kindInfos)
                log("-----------------------------------------")
                return seqArr.length > 0
            },
            ()=>{//顺子测试单元
                log("---------------------顺子测试----------------")
                // log(cardCInfo)
                let seqArr:number[][]= fetchSeq(cardCInfo)
                let infos:string[][] = []
                let isTestInfo:boolean[] = []
                let kindInfos:CardKind[] = []
                for (let i = 0; i < seqArr.length; ++i) {
                    let sInfo = []
                    for (let j = 0; j < seqArr[i].length; ++j) {
                        sInfo.push( 
                            getCardSymbol(seqArr[i][j])
                        )
                    }
                    infos.push(sInfo)
                    isTestInfo.push(
                        isSeq(makeCardIdentifyInfo(seqArr[i]))
                    )
                    kindInfos.push(
                        CardKind[String(getCardKind(seqArr[i]))]
                    )
                }
                log(infos)
                log(isTestInfo)
                log(kindInfos)
                log("-----------------------------------------")
                return seqArr.length > 0
            },
            ()=>{//四张测试单元
                log("---------------------四张测试----------------")
                // log(cardCInfo)
                let four:number[][]= fetchQuadruplets(cardCInfo)
                let infos:string[][] = []
                let isTestInfo:boolean[] = []
                let kindInfos:CardKind[] = []
                for(let t of four){
                    infos.push([
                        getCardSymbol(t[0]),
                        getCardSymbol(t[1]),
                        getCardSymbol(t[2]),
                        getCardSymbol(t[3]),
                    ])
                    isTestInfo.push(
                        isQuadruplets(makeCardIdentifyInfo(t))
                    )
                    kindInfos.push(
                        CardKind[String(getCardKind(t))]
                    )
                }
                log(infos)
                log(isTestInfo)
                log(kindInfos)
                log("-----------------------------------------")
                return four.length > 0
            },
            ()=>{//三张测试单元
                log("---------------------三张测试----------------")
                // log(cardCInfo)
                let triplet:number[][]= fetchTriplet(cardCInfo)
                let infos:string[][] = []
                let isTestInfo:boolean[] = []
                let kindInfos:CardKind[] = []
                for(let t of triplet){
                    infos.push([
                        getCardSymbol(t[0]),
                        getCardSymbol(t[1]),
                        getCardSymbol(t[2]),
                    ])
                    isTestInfo.push(
                        isTriplet(makeCardIdentifyInfo(t))
                    )
                    kindInfos.push(
                        CardKind[String(getCardKind(t))]
                    )
                }
                log(infos)
                log(isTestInfo)
                log(kindInfos)
                // log(cardCInfo)
                log("-----------------------------------------")
                return triplet.length > 0
            },
            ()=>{//对子测试单元
                log("---------------------对子测试----------------")
                // log(cardCInfo)
                let pair = fetchPair(cardCInfo)
                let infos:string[][] = []
                let isTestInfo:boolean[] = []
                let kindInfos:CardKind[] = []
                for(let p of pair){
                    infos.push([
                        getCardSymbol(p[0]),
                        getCardSymbol(p[1]),
                    ])
                    isTestInfo.push(
                        isPair(makeCardIdentifyInfo(p))
                    )
                    kindInfos.push(
                        CardKind[String(getCardKind(p))]
                    )
                }
                log(infos)
                log(isTestInfo)
                log(kindInfos)
                // log(cardCInfo)
                log("-----------------------------------------")
                return pair.length > 0
            },
            ()=>{//单张测试单元
                log("---------------------单张测试----------------")
                let single:number[][] = fetchSingle(cardCInfo)
                let infos:string[][] = []
                let isTestInfo:boolean[] = []
                let kindInfos:CardKind[] = []
                single.forEach((value:number[], index:number)=>{
                    infos.push([getCardSymbol(value[0])])
                    isTestInfo.push(
                        isSingle(makeCardIdentifyInfo(value))
                    )
                    kindInfos.push(
                        CardKind[String(getCardKind(value))]
                    )
                })
                log(infos)
                log(isTestInfo)
                log(kindInfos)
                log("-----------------------------------------")
                return single.length > 0
            },
        ]

        let isDone = false
        let doneIndex = 4
        // for(let i=0; i <testUnits.length; ++i){
        //     if (doneIndex == i) {
        //         isDone = testUnits[i]()
        //     }
        //     else {
        //         testUnits[i]()
        //     }
        // }
        isDone = testUnits[0]()


        loopCount += 1
        if (isDone) {
            log('------------------------结束测试:%d------------------------', loopCount)
        }
        else {
            log('------------------------继续测试:%d------------------------', loopCount)
        }
        return isDone

    }
}

function run() {
    if(GoSouthRule.test()==false){
        // setTimeout(run, 3000)
        run()
    }
}

run()
