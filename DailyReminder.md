# Daily Reminder

<details><summary>RoadMap</summary>

## To focus on works at hand, I need to look ahead and be assured
- open source project participation as real world working experience
- participation is to demonstrate you are good at reading harder codebase, fixing bugs, adding new features and communicate them 
- watch and code curriculum teaches us the first three and support us with the fourth one by question-asking and feedback loops.
- Also to restore the actual participation experience to students, advanced students who participated in the open source projects are sharing their experience in meeting videos, e.g., Syntax Highlighting by Janelle de Ment [video](https://watchandcode.com/courses/77710/lectures/11078838)
- watch and code is preparing us for real open source project participation. In the process students learn towards this goal in simulation projects from simple to complex. Of course, some may say the actual participation of real project is still different (real people, real problem, real communication back and forth). However, we should not mythify it, after all it just consists of reading source, fixing bug, writing new features, communicate them, which we have and will kept doing in the curriculum. 
- in other words, real open source project could just be watch and code final simulation projects. Why still simulation? because 1) we can't simulate the actual real world experience logically or in theory; 2) but the solved issues, bugs and communication process have saved openly by mozilla; 3) so, in theory we got all the resources to recreate the bug, and simulate the communication environment, to allow students gain the experience Jaril and Janelle had in exploring the just right issues they have encountered; 4) this way, we don't need to rely on luck to find the appropriate level of bugs or issues in the real project to learn; on the contrary, we should be able to find enough issues/bugs on all levels in real project and turn them into open source project participation simulation throughout different sections of our watch and code curriculum.
 - my **question**: 
    - bad question: "how long does it take me to become a job ready as a professional software dev?" 
    - I know it is bad question as it is difficult to answer on individuals, but I can't help to ask about it in my mind often. 
    - good question: "how feasible is it to turn advanced students participation in real world open source projects into open source project participation simulation throughout watch and code curriculum?"  ❓ 

## How to get the most out of advanced students open source project experience sharing? ❓ 

I can't get the firefox debugger properly started running at the moment, therefore I can't properly experiment with the software. But it should not stop us from learning from the experience advanced students have in open source project. I think students who were watching videos can benefit a lot if a little more information below is provided. :zap:

- [ ] where is the bug issue reported? (showed and read, but the link is missing)
- [x] what did you do with the issue? (e.g., Janelle reproduced the bug with your machine and example, demonstrated in the video)
- [ ] Where is the back and forth communication between you and the container? (links?)
- [ ] Where is the code responsible for the bug and where is the changed code to correct it? (links?)
- [ ] Is there anything in the communication or else in the process you wish you could have done better or avoid doing? 

  

</details>

<details><summary>Debugger</summary>

- debugger is your most intimate guide
- you can actually write code and run debugger in chrome console altogether
- but I think I will use vscode+chrome most of the time

</details>

<details><summary>Questioner</summary>

- be good at asking question is a great deal
- How-to Ask Good Questions [goto](https://medium.com/@gordon_zhu/how-to-be-great-at-asking-questions-e37be04d0603)
- Ask with a template [goto](https://github.com/gordonmzhu/questions/issues/new?template=Custom.md)

</details>

<details><summary>Live Coding</summary>

## Recording my own daily live coding 

- Reading without Coding is doing Nothing! :zap:
- enforce coding with patience
- enforce examine thought and coding process
- enforce good writing
- enforce rewatch, reflect, improvement next time
- [playlist](https://youtu.be/wQ4n5SsVU0U?list=PLx08F1efFq_X6rFsVycEYOoH6BSuNCDgm)

</details>

<details><summary>Testing</summary>

## Test and Rewrite Procedures

1. read docs and specs ⭐️ extremely slowly and carefully to get out as many use cases as possible :zap: :zap: :zap:
    - copy the sentence you are reading from docs into description
    - describe the use case you read from the sentence
    - write an code example with the native method to demo the use case
    - add `debugger` into the demo example to experiment
Note: if you are the ones highly suspect the validity of docs (also specs doesn't say much e.g., `copyWithin`), you should thoroughly experiment the options of array and arguments ::: 
    - experiment array : try array from simple to more complex
        - simple case : `[0]`, `[1,2]`, `[1,2,3,4]`
        - edge case : `[]`
    - experiment `target` (first arg in `copyWithin`): 
        - keep other optional args empty (`undefined`)
        - try in order `0`, `1`, `2`, ... 
        - try leave `target` empty or `undefined` (edge case)
    - experiment `start` ... in the similar style
2. each use case (or test) should be as tiny, explicit, action-specific as possible
    - each use case focuses on a single, specific utility or action 
        - (i.e., one specific situation of inputs lead to one specific situation of output, always just set out to test one specific situation)
    - improve on the description iteratively
    - reorganize the order of tests from simple to complex
3. write your test as tiny, simple, easy as possible
    - only write codes to test what you set out to test in the description above
    - start with the simplest array, e.g., [0] or [1,2]
4. make sure the native method and polyfill code pass all of your tests
    - meanwhile, you may think of some edge use cases or tests
5. rewrite your function from scratch by building it up one test by another
    - your function should pass all tests of course
6. refactor your code
    - to link source codes with particular tests
    - to refactor with util functions
    - to organize using section comments
7. read pseudo-source code and polyfill code 
    1. to write the real source code line by line while reading the pseudo code
    2. comment on the part you don't understand
    3. read the polyfill code and check whether it mirrors the pseudo code in specs (or your code in 7.1 )
    4. debugger it until you understand the part of code you don't understand
    5. start to ponder whether this is new code pattern you should learn from

I found this sequence of working is very helpful, when I was doing it, I felt confident that I won't miss anything important, and can easily focused on coding the very specific problem at hand. After the `copyWithin` demo daily meeting, I realized `copyWithin` is much more challenging than the previous methods I tried with this procedure. So, I applied this procedure to rewrite `copyWithin` and as a result I updated the procedure from 5 steps to 7 (shown above). So far it works well.

## How to learn from good code?

1. exhaust all use cases 
    - code authors are humans, we think of ends (use cases) first and then means to achieve it
    - reading use cases out of docs, specs
    - step into the shoes of the author and freely experimenting other possible edge use cases
    - read pseudo-source and polyfill to discover hidden use cases
2. reorganize use cases from simple to complex
3. case by case, gradually writing up your code
4. refactor your code 
5. compare your code with polyfill and source to discover the good or better way of doing it
6. learn the new tricks from the good code from specific context of use cases

## Apply testing approach to smallTest.js library

1. smallTest.js is a very small library, but you can't write it by memorizing it
2. the best way to write it your own is first to write up docs or specs
3. then break the docs and specs into features and tests
4. write up the library step by step through tests from simple to complex

</details>

<details><summary>Coding Independently</summary>

- avoid the pleasure of discovering being taken away
- but watch ahead to get an idea what is taught and not
    