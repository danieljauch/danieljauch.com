---
layout: post
title: "SSH Key Cleanup"
description: "Managing keys for multiple version control accounts gets to be a hassle pretty quickly."
date: 2018-10-15
tags: webdev ssh
published: true
---

Like many of you, I imagine, I have used multiple version control accounts. On one computer I may have BitBucket, GitHub, GitLab, or others. It's possible I might even have more than one account on the same system on the same machine (like two BitBucket accounts in my case).

At first look, this is a massive hassle and has an issue trying to add one SSH key to multiple accounts, but there's a fairly simple way to manage it all.

## Getting set up

First things first. Go to your version control systems, go to settings and delete all the SSH keys that have to do with the machine that you're currently on. That's going to sound scary, so if you're afraid to try it and you want to do that at the end, that's fine. It was just confusing to me when I didn't "start fresh".

Next, go to your `.ssh` directory:

```
$ cd ~/.ssh
```

And let's take a look inside that directory with the `ls` command. If you are reading this to help manage your folder, you probably have a list of randomly named files with no extensions and a list of matching files with the `.pub` extension like this:

```
$ ls
blah
blah.pub
bla2
bla2.pub
id_rsa
id_rsa.pub
known_hosts
```

You very likely have a `known_hosts` file and by default, at least one of your files with the `.pub` partner is `id_rsa`.

## How did this happen?

In my case (and I'm betting this is true for you as well), I set up an account the default way with `id_rsa` then I needed another so I added a custom named one, then it just kept happening.

## How to fix it

### Step 1: one SSH per email (or account)

There are a lot of ways to generate SSH keys with the `ssh-keygen` command ([see the docs](https://www.ssh.com/ssh/keygen/)), but here's [GitHub's suggestion](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) and my personal favorite:

```
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Now in this command you see an option to enter your email in the quotes. I recommend doing this option once per email address, but if you wanted to, you could repeat this process using the same email once per account.

After you've executed the command, you'll receive an option to name the file with `id_rsa` as the default option. You can name the file anything, even the email address if that helps you recognize it. My recommendation is that you use something like `personal` or `work` with underscores to separate identifiers (e.g. `work_bitbucket`) because using an email address includes dots, which makes it hard to visually scan (consider seeing `name@email.com` and `name@email.com.pub`).

### Step 2: the `config` file

Make a new file and open it up in your editor of choice. If you're familiar with `vim`, that's an easy way to do this from this step as well:

```
$ touch config
$ vim config
```

Because BitBucket has particular needs for the way this is set up, I'll use it as the example, but GitHub and any other system should work the same. In the file, you'll need to add a `Host` for each account, and within that, include a `HostName` and `IdentityFile` line like so:

```
Host account.bitbucket.org
  HostName bitbucket.org
  IdentityFile ~/.ssh/personal_bitbucket

Host companyname.bitbucket.org
  HostName bitbucket.org
  IdentityFile ~/.ssh/work_bitbucket
```

- `Host`: theoretically, this could be anything that makes sense to you, but I like using the subdomain on the service you use because it matches the SSH URL when using `git clone`
- `HostName`: the base url where this is used
- `IdentityFile`: the specific file (without the `.pub`) that you created for this account in the last step

### Step 3: put the keys in your accounts

Go into settings for each of your version control accounts and add the keys that match up. From the terminal the easiest way to do this is by using the `cat` command on the `.pub` version of the file with your custom filename:

```
$ cat personal_bitbucket.pub
```

Then copy the output. Quick note on this, some systems will require you to include the blank newline at the end of the `.pub` file, others might not care about the newline.

### Step 4: check your repos

Go back into your repos and `push` or `pull` your current branch to make sure that the connection works. You might experience issues specifically in BitBucket if you cloned your repository via SSH originally. You can fix this issue by removing the SSH remote and adding the HTTPS version:

```
$ git remote remove origin
$ git remote add origin https://account@bitbucket.org/account/repo.git
```
