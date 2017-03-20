1.  Git types: blob/tree/commit/tag
2.  查看文件及提交等：git show {hash} / git ls-tree {hash} /git show --pretty-raw -s {hash}注意灵活运用参数 /git log 
3.  git cat-file tag {tag-name}  
4.  git reset --hard HEAD  / 已提交： git reset --hard ORIG_HEAD
5.  git log --stat [--pretty=oneline/short] [--graph 查看可提交历史线]
6.  git diff master..test 版本差异/ git diff master...test 共有父分支和test的差异
    git diff {branch/hash/HEAD} -- ./lib 比较某个目录下文件
    
page to    P40 分布式流程